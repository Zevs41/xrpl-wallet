import { Module } from '@nestjs/common';
import { ControllersModule } from './controller/controllers.module';
import { CommonModule } from './common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/logger/logging.interceptor';

@Module({
  imports: [CommonModule, ControllersModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
