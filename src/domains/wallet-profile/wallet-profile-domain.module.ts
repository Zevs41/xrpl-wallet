import { Module } from '@nestjs/common';
import { WalletProfileDomain } from './wallet-profile.domain';

@Module({
  providers: [WalletProfileDomain],
  exports: [WalletProfileDomain],
})
export class WalletProfileDomainModule {}
