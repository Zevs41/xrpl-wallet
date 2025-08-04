import { Module } from '@nestjs/common';
import { XrplAccountLibService } from './xrpl-accountlib.service';

@Module({
  providers: [XrplAccountLibService],
  exports: [XrplAccountLibService],
})
export class XrplAccountLibModule {}
