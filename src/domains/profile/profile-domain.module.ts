import { Module } from '@nestjs/common';
import { ProfileDomain } from './profile.domain';

@Module({
  providers: [ProfileDomain],
  exports: [ProfileDomain],
})
export class ProfileDomainModule {}
