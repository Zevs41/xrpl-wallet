import { Module } from '@nestjs/common';
import { AttachmentDomain } from './attachment.domain';

@Module({
  providers: [AttachmentDomain],
  exports: [AttachmentDomain],
})
export class AttachmentDomainModule {}
