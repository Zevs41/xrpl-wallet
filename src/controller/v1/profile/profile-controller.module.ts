import { Module } from '@nestjs/common';
import { ProfileServiceModule } from 'src/services/profile/profile-service.module';
import { ProfileController } from './profile.controller';

@Module({
  imports: [ProfileServiceModule],
  controllers: [ProfileController],
})
export class ProfileControllerModule {}
