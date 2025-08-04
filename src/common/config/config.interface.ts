export interface IConfig {
  port: number;
  nodeEnv: string;

  jwt: IJwtConfig;

  redis: IConfigRedis;
  minio: IConfigMinio;
}

export interface IJwtConfig {
  jwtSecretKey: string;
  jwtAccessExpiresIn: number;
  jwtRefreshExpiresIn: number;
}

export interface IConfigRedis {
  host: string;
  port: number;
  keys: IConfigRedisKeys;
}

export interface IConfigRedisKeys {
  challengeTokens: string;
}

export interface IConfigMinio {
  url: string;
  endPoint: string;
  port: number;
  bucketName: string;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
  rootUser: string;
  rootPassword: string;
}
