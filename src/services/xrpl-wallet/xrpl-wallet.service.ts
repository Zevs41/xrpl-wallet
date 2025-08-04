import { Injectable } from '@nestjs/common';
import { XrplWalletDomain } from 'src/domains/xrpl-wallet/xrpl-wallet.domain';

@Injectable()
export class XrplWalletService {
  constructor(private readonly xrplDomain: XrplWalletDomain) {}

  create() {
    return this.xrplDomain.create();
  }

  importFromSeed(seed: string) {
    return this.xrplDomain.importFromSeed(seed);
  }
}
