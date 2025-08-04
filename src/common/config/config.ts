import type { IConfig } from './config.interface';

export const Config = (): IConfig => {
  return {
    port: Number(process.env.PORT_CLIENT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',

    jwt: {
      jwtSecretKey: process.env.JWT_SECRET || 'secret',
      jwtAccessExpiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN) || 30,
      jwtRefreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN) || 30,
    },

    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      keys: {
        challengeTokens: `challengeTokens`,
      },
    },

    minio: {
      url: process.env.MINIO_URL || 'http://localhost:9011',
      endPoint: process.env.MINIO_HOST || 'localhost',
      port: Number(process.env.MINIO_PORT) || 9011,
      bucketName: process.env.MINIO_BUCKET_NAME || 'xrpl',
      useSSL: (Number(process.env.MINIO_USE_SSL) || 0) === 1,
      accessKey: process.env.MINIO_ACCESS_KEY || 'access_key',
      secretKey: process.env.MINIO_SECRET_KEY || 'secret_key',
      rootUser: process.env.MINIO_ROOT_USER || 'minio',
      rootPassword: process.env.MINIO_ROOT_PASSWORD || '12345678',
    },
  };
};
