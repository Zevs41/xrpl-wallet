import { Controller, Param, Post, Put } from '@nestjs/common';
import { XrplWalletService } from 'src/services/xrpl-wallet/xrpl-wallet.service';

@Controller('v1/xrpl-wallet')
export class XrplWalletController {
  constructor(private readonly xrplWalletService: XrplWalletService) {}

  @Post('')
  create() {
    return this.xrplWalletService.create();
  }

  @Put('/:seed')
  importWalletFromSeed(@Param('seed') seed: string) {
    return this.xrplWalletService.importFromSeed(seed);
  }
}
