import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor() {}
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request =
      context.getType() === 'rpc'
        ? context.switchToRpc().getData()
        : context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => data ?? {}),
      tap(async (data) => {
        this.logger.log({
          req:
            context.getType() === 'rpc'
              ? request
              : {
                  method: request.method,
                  url: request.url,
                  body: request.body,
                  query: request.query,
                  params: request.params,
                  headers: request.headers,
                },
          res: data,
        });
      }),
    );
  }
}
