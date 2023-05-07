import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ValorationCriteriaDto } from './dto/valorationCriteria.dto';
import { ValorationResultsDto } from './dto/valorationResults.dto';
import { AdvisorService } from './advisor.service';
import { HttpExceptionFilter } from '../shared/filters/http-exception.filter';

@Controller('advisor')
export class AdvisorController {
  constructor(private advisorSrv: AdvisorService) {}

  @Post()
  @UseFilters(HttpExceptionFilter)
  advice(@Body() body: ValorationCriteriaDto): Promise<ValorationResultsDto> {
    return this.advisorSrv.advice(body);
  }
}
