import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDomainModule } from 'src/domains/profile/profile-domain.module';

@Module({
  imports: [ProfileDomainModule],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileServiceModule {}
