import { Injectable } from '@nestjs/common';
import { deriveAddress, deriveKeypair, generateSeed } from 'ripple-keypairs';

@Injectable()
export class XrplAccountLibService {
  constructor() {}

  async createWallet() {
    const seed = generateSeed();
    const keypair = deriveKeypair(seed);
    const address = deriveAddress(keypair.publicKey);

    return {
      seed,
      privateKey: keypair.privateKey,
      publicKey: keypair.publicKey,
      address,
    };
  }

  async importFromSeed(seed: string) {
    const keypair = deriveKeypair(seed);
    const address = deriveAddress(keypair.publicKey);

    return {
      seed: seed,
      privateKey: keypair.privateKey,
      publicKey: keypair.publicKey,
      address,
    };
  }
}
