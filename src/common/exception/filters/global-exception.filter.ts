import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import {
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import type { Request, Response } from 'express';

import { BackendException } from '../backend.exception';
import { EErrorCode } from '../enums/error-code.enum';
import type { HttpMethod } from '../types/http-method.type';
import { WebSocketClient } from 'src/common/web-socket/interface/web-socket-client.interface';
import { WsExceptionDto } from '../dto/ws-exception.dto';
import { WebSocketErrorResponse } from 'src/common/web-socket/interface/web-socket-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: BackendException | Error, host: ArgumentsHost): any {
    if (host.getType() === 'ws') {
      const ws = host.switchToWs();
      const client = ws.getClient<WebSocketClient>();
      const backendException: BackendException =
        this.convertException(exception);


      const res: WsExceptionDto = {
        event: ws.getPattern(),
        timestamp: new Date(),
        code: backendException.code,
        message: backendException.messageDebug, // socket cluster support
        messageUI: backendException.message,
        messageDebug: backendException.messageDebug,
        data: backendException.data,
      };

      Logger.error('socket procedure error', {
        reg: {
          id: client.id,
          headers: client.request.headers,
          remoteAddress: client.conn.remoteAddress,
        },
        walletUuuid: client.data.walletUuid,
        res,
        stack: exception.stack,
      });

      const ackCallback = host.getArgByIndex(2);
      if (ackCallback && typeof ackCallback === 'function') {
        ackCallback(<WebSocketErrorResponse>{ error: res });
      }
      return;
    }
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();

    const backendException: BackendException = this.convertException(exception);

    const res = {
      url: request.url,
      method: request.method as HttpMethod,
      timestamp: new Date(),
      code: backendException.code,
      messageDebug: backendException.messageDebug,
      data: backendException.data,
    };

    this.logger.error({
      req: {
        method: request.method,
        url: request.url,
        body: request.body,
        query: request.query,
        params: request.params,
        headers: request.headers,
      },
      res: res,
    });

    response.status(backendException.httpCode).json(res);
  }

  private convertException(
    exception: BackendException | Error | HttpException,
  ): BackendException {
    switch (true) {
      case exception instanceof BackendException:
        return <BackendException>exception;
      case exception instanceof HttpException:
        return new BackendException(EErrorCode.Validate, {
          httpCode: (exception as any).statusCode,
          messageDebug: (exception as any).response.message,
        });
      case exception instanceof UnauthorizedException:
        return new BackendException(EErrorCode.Unauthorized);
      default:
        return new BackendException(EErrorCode.Unknown, {
          messageDebug: exception.toString(),
          httpCode: HttpStatus.I_AM_A_TEAPOT,
        });
    }
  }
}
