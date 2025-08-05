import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as crypto from 'crypto';
import * as Minio from 'minio';

import { ResFileDto } from './dto/res-file.dto';
import { ConfigService } from '@nestjs/config';
import { IConfig, IConfigMinio } from '../config/config.interface';

@Injectable()
export class MinioClientService implements OnModuleInit {
  private readonly baseBucket: string;
  private minioClient: Minio.Client;

  private minioConfig: IConfigMinio;

  constructor(private readonly configService: ConfigService<IConfig>) {
    this.minioConfig = this.configService.getOrThrow<IConfigMinio>('minio');

    this.minioClient = new Minio.Client({
      ...this.minioConfig,
      accessKey: this.minioConfig.rootUser,
      secretKey: this.minioConfig.rootPassword,
    });

    this.baseBucket = this.minioConfig.bucketName;
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.createBucketInMinio();
    } catch (e) {
      Logger.error('Minio init error:', e);
    }
  }

  async createBucketInMinio() {
    const exists = await this.minioClient.bucketExists(this.baseBucket);

    if (!exists) {
      await this.minioClient.makeBucket(this.baseBucket);

      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${this.baseBucket}/*`],
          },
        ],
      };

      await this.minioClient.setBucketPolicy(
        this.baseBucket,
        JSON.stringify(policy),
      );
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<ResFileDto> {
    const temp_filename = Date.now().toString();

    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');

    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    const filename = hashedFileName + ext;

    await this.minioClient.putObject(
      this.baseBucket,
      filename,
      file.buffer,
      undefined,
      {
        'Content-Type': `${file.mimetype}`,
      },
    );

    return {
      url: `${this.minioConfig.url}/${this.minioConfig.bucketName}/${filename}`,
    };
  }

  async removeFile(objetName: string, baseBucket: string = this.baseBucket) {
    this.minioClient.removeObject(baseBucket, objetName);
  }
}
