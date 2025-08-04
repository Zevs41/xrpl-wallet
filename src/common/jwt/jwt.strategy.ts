import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IConfig, IJwtConfig } from 'src/common/config/config.interface';
import { JwtPayload } from 'src/services/auth/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<IConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<IJwtConfig>('jwt').jwtSecretKey,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return {
      walletUuid: payload.walletUuid,
    };
  }
}
