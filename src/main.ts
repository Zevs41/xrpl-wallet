import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { IConfig } from './common/config/config.interface';
import { GlobalExceptionFilter } from './common/exception/filters/global-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { loggerOptions } from './common/logger/winston.logger';
import type { ValidationError } from 'class-validator';
import { ValidateException } from './common/exception/validate.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const appConfig: ConfigService<IConfig> = app.get(ConfigService);

  const env = appConfig.getOrThrow<string>('nodeEnv');
  const port = appConfig.getOrThrow<number>('port');

  app.setGlobalPrefix('api');

  app.enableCors();
  app.useGlobalPipes(
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
  );
  app.useLogger(WinstonModule.createLogger(loggerOptions(env)));

  app.useGlobalFilters(new GlobalExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Task Processing System')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}

bootstrap();
