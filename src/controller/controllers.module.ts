import { Module } from '@nestjs/common';
import { XrplControllerModule } from './v1/xrpl-wallet/xrpl-wallet-controller.module';
import { AuthControllerModule } from './v1/auth/auth-controller.module';
import { ProfileControllerModule } from './v1/profile/profile-controller.module';
import { FileControllerModule } from './v1/file/file-controller.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';

@Module({
  imports: [
    AuthControllerModule,
    XrplControllerModule,
    ProfileControllerModule,
    FileControllerModule,
  ],
})
export class ControllersModule {}
