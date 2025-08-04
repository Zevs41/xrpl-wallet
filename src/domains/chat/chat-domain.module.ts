import { Module } from '@nestjs/common';
import { ChatDomain } from './chat.domain';

@Module({
  providers: [ChatDomain],
  exports: [ChatDomain],
})
export class ChatDomainModule {}
