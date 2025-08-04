import { Module } from '@nestjs/common';
import { XrplWalletService } from './xrpl-wallet.service';
import { XrplDomainModule } from 'src/domains/xrpl-wallet/xrpl-wallet-domain.module';

@Module({
  imports: [XrplDomainModule],
  providers: [XrplWalletService],
  exports: [XrplWalletService],
})
export class XrplServiceModule {}
