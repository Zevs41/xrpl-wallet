import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestDetails = this.getRequestDetails(context);
    const requestLog = { req: requestDetails };

    return next.handle().pipe(
      tap((data) => {
        this.logger.log({ ...requestLog, res: data });
      }),
      catchError((error) => {
        this.logger.error({ ...requestLog, err: error });
        return throwError(() => error);
      }),
    );
  }

  private getRequestDetails(context: ExecutionContext): Record<string, any> {
    if (context.getType() === 'ws') {
      const wsContext = context.switchToWs();
      return {
        eventName: wsContext.getPattern(),
        eventData: wsContext.getData(),
      };
    } else {
      const httpContext = context.switchToHttp();
      const request = httpContext.getRequest<Request>();
      return {
        endpoint: request.url,
        body: request.body || {},
        headers: request.headers,
        params: request.params,
      };
    }
  }
}
