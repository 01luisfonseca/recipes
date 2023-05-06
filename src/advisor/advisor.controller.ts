import { Controller, Get } from '@nestjs/common';
import { CallerService } from '../shared/modules/caller/caller.service';

@Controller('advisor')
export class AdvisorController {
  constructor(private callerSrv: CallerService) {}

  @Get()
  async advice(): Promise<any> {
    return await this; //! // FIXME: Here is awaiting correct implementation
  }
}
