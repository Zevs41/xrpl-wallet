import { Module } from '@nestjs/common';
import { XrplControllerModule } from './v1/xrpl-wallet/xrpl-wallet-controller.module';
import { AuthControllerModule } from './v1/auth/auth-controller.module';
import { ProfileControllerModule } from './v1/profile/profile-controller.module';
import { FileControllerModule } from './v1/file/file-controller.module';
import { WalletProfileControllerModule } from './v1/wallet-profile/wallet-profile-controller.module';

@Module({
  imports: [
    AuthControllerModule,
    XrplControllerModule,
    ProfileControllerModule,
    WalletProfileControllerModule,
    FileControllerModule,
  ],
})
export class ControllersModule {}
