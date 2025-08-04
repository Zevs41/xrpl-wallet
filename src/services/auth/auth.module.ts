import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/common/jwt/jwt.strategy';
import { IConfig, IJwtConfig } from 'src/common/config/config.interface';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IConfig>) => ({
        secret:
          configService.getOrThrow<IJwtConfig>('jwt').jwtSecretKey || 'secret',
        signOptions: {
          expiresIn:
            configService.getOrThrow<IJwtConfig>('jwt').jwtAccessExpiresIn +
              'm' || '30m',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
