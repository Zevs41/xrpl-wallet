import { Module } from '@nestjs/common';
import { XrplServiceModule } from 'src/services/xrpl-wallet/xrpl-wallet-service.module';
import { XrplWalletController } from './xrpl-wallet.controller';

@Module({
  imports: [XrplServiceModule],
  controllers: [XrplWalletController],
})
export class XrplControllerModule {}
