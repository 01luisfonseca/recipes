import { Module } from '@nestjs/common';
import { AdvisorController } from './advisor.controller';
import { AdvisorService } from './advisor.service';
import { CallerModule } from '../shared/modules/caller/caller.module';

@Module({
  controllers: [AdvisorController],
  providers: [AdvisorService],
  imports: [CallerModule],
})
export class AdvisorModule {}
