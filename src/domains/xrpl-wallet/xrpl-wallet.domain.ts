import { Injectable } from '@nestjs/common';
import { XrplAccountLibService } from 'src/libs/xrpl-accountlib/xrpl-accountlib.service';

@Injectable()
export class XrplWalletDomain {
  constructor(private readonly xrplAccountLibService: XrplAccountLibService) {}

  create() {
    return this.xrplAccountLibService.createWallet();
  }

  importFromSeed(seed: string) {
    return this.xrplAccountLibService.importFromSeed(seed);
  }
}
