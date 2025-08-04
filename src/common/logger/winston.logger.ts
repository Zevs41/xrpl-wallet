import { utilities } from 'nest-winston';
import * as winston from 'winston';

export const loggerOptions = (nodeEnv: string): winston.LoggerOptions => {
  return {
    level: nodeEnv === 'production' ? 'info' : 'debug',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nodeEnv === 'production'
            ? winston.format.json()
            : utilities.format.nestLike(undefined, {
                colors: true,
                prettyPrint: true,
              }),
        ),
      }),
    ],
  };
};
