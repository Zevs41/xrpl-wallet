import { Module } from '@nestjs/common';
import { MessageDomain } from './message.domain';

@Module({
  providers: [MessageDomain],
  exports: [MessageDomain],
})
export class MessageDomainModule {}
