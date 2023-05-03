import { Injectable } from '@nestjs/common';
import { AliveType } from './shared/types/app.types';

@Injectable()
export class AppService {
  isAlive(): AliveType {
    return { alive: true };
  }
}
