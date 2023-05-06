import { Injectable } from '@nestjs/common';
import { CallerService } from '../shared/modules/caller/caller.service';
import { ValorationCriteriaDto } from './dto/valorationCriteria.dto';
import { ValorationResultsDto } from './dto/valorationResults.dto';

@Injectable()
export class AdvisorService {
  constructor(private callerSrv: CallerService) {}

  async advice(body: ValorationCriteriaDto): Promise<ValorationResultsDto> {
    const restaurantList = [];

    return {}; //! // FIXME: Here is awaiting correct implementation
  }
}
