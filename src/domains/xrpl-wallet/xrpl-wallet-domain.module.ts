import { Module } from '@nestjs/common';
import { XrplWalletDomain } from './xrpl-wallet.domain';
import { XrplAccountLibModule } from 'src/libs/xrpl-accountlib/xrpl-accountlib.module';

@Module({
  imports: [XrplAccountLibModule],
  providers: [XrplWalletDomain],
  exports: [XrplWalletDomain],
})
export class XrplDomainModule {}
