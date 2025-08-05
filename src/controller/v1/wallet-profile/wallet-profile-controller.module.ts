import { Module } from '@nestjs/common';
import { WalletProfileServiceModule } from 'src/services/wallet-profile/wallet-profile-service.module';
import { WalletProfileController } from './wallet-profile.controller';

@Module({
  imports: [WalletProfileServiceModule],
  controllers: [WalletProfileController],
})
export class WalletProfileControllerModule {}
