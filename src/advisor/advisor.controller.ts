import { Body, Controller, Post } from '@nestjs/common';
import { ValorationCriteriaDto } from './dto/valorationCriteria.dto';
import { ValorationResultsDto } from './dto/valorationResults.dto';
import { AdvisorService } from './advisor.service';

@Controller('advisor')
export class AdvisorController {
  constructor(private advisorSrv: AdvisorService) {}

  @Post()
  advice(@Body() body: ValorationCriteriaDto): Promise<ValorationResultsDto> {
    return this.advisorSrv.advice(body);
  }
}
