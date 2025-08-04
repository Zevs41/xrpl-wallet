import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as keypairs from 'ripple-keypairs';
import { ChallengeToken, JwtPayload } from './types';
import { ReqVerifyDto } from 'src/controller/v1/auth/dto/req/verify.dto';
import { RedisService } from 'src/common/redis/redis.service';
import { BackendException } from 'src/common/exception/backend.exception';
import { EErrorCode } from 'src/common/exception/enums/error-code.enum';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ReqRefreshDto } from 'src/controller/v1/auth/dto/req/req-refresh.dto';
import { ResRefreshDto } from 'src/controller/v1/auth/dto/res/res-refresh.dto';
import { ConfigService } from '@nestjs/config';
import { IConfig, IJwtConfig } from 'src/common/config/config.interface';
import { DateTime } from 'luxon';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async generateChallengeToken(walletAddress: string): Promise<string> {
    const token = require('crypto').randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.redisService.setJson(walletAddress, { token, expiresAt });

    return token;
  }

  async verify(signedChallenge: ReqVerifyDto): Promise<ResRefreshDto> {
    const isValid = await this.verifyChallenge(signedChallenge);

    if (!isValid) {
      throw new BackendException(EErrorCode.Unauthorized);
    }

    let wallet = await this.prismaService.wallet.findFirst({
      where: {
        address: signedChallenge.walletAddress,
        publicKey: signedChallenge.publicKey,
      },
      select: { uuid: true },
    });

    if (!wallet)
      wallet = await this.prismaService.wallet.create({
        data: {
          address: signedChallenge.walletAddress,
          publicKey: signedChallenge.publicKey,
        },
        select: { uuid: true },
      });

    return {
      access: this.generateJwt({
        walletUuid: wallet.uuid,
      }),
      refresh: await this.generateRefresh(wallet.uuid),
    };
  }

  async verifyChallenge(signedChallenge: ReqVerifyDto): Promise<boolean> {
    const { walletAddress, publicKey, signature, challengeToken } =
      signedChallenge;

    const storedChallenge =
      await this.redisService.getJson<ChallengeToken>(walletAddress);

    if (!storedChallenge || storedChallenge.token !== challengeToken) {
      return false;
    }

    if (new Date() > storedChallenge.expiresAt) {
      await this.redisService.delKey(walletAddress);
      return false;
    }

    const verified = keypairs.verify(
      Buffer.from(challengeToken, 'hex').toString('hex'),
      signature,
      publicKey,
    );

    if (verified) {
      await this.redisService.delKey(walletAddress);
    }

    return verified;
  }

  generateJwt(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  async refresh(data: ReqRefreshDto): Promise<ResRefreshDto> {
    const { token } = data;
    const oldToken =
      await this.prismaService.walletRefreshToken.findUniqueOrThrow({
        where: {
          token: token,
        },
      });

    if (!oldToken || DateTime.now() > DateTime.fromJSDate(oldToken.expDate)) {
      throw new BackendException(EErrorCode.Unauthorized);
    }

    await this.prismaService.walletRefreshToken.delete({
      where: { token: oldToken.token },
    });

    const refresh = await this.generateRefresh(oldToken.walletUuid);

    const access = await this.generateJwt({ walletUuid: oldToken.walletUuid });

    return {
      access,
      refresh,
    };
  }

  async generateRefresh(walletUuid: string) {
    return this.prismaService.walletRefreshToken
      .create({
        data: {
          walletUuid: walletUuid,
          expDate: DateTime.now()
            .plus({
              days: Number(
                this.configService.getOrThrow<IJwtConfig>('jwt')
                  .jwtRefreshExpiresIn,
              ),
            })
            .toJSDate(),
        },
      })
      .then((token) => token.token);
  }
}
