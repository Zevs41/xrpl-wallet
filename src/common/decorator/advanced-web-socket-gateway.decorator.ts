import {
  applyDecorators,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import type { ValidationError } from 'class-validator';
import { WebSocketGateway } from '@nestjs/websockets';

import { GlobalExceptionFilter } from '../exception/filters/global-exception.filter';
import { ValidateException } from '../exception/validate.exception';
import { LoggingInterceptor } from '../logger/logging.interceptor';

export function AdvancedWebSocketGateway() {
  return applyDecorators(
    WebSocketGateway(),
    UseFilters(GlobalExceptionFilter),
    UsePipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        whitelist: true,
        exceptionFactory(validationErrors: ValidationError[]) {
          return new ValidateException(validationErrors);
        },
      }),
    ),
    UseInterceptors(LoggingInterceptor),
  );
}
