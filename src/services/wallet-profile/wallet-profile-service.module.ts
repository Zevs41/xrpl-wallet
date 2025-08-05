import { Module } from '@nestjs/common';
import { WalletProfileService } from './wallet-profile.service';
import { WalletProfileDomainModule } from 'src/domains/wallet-profile/wallet-profile-domain.module';

@Module({
  imports: [WalletProfileDomainModule],
  providers: [WalletProfileService],
  exports: [WalletProfileService],
})
export class WalletProfileServiceModule {}
