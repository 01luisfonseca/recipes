import { Injectable } from '@nestjs/common';
import { RestaurantFactory } from './factories/restaurant.factory';

export enum CallType {
  restaurant = 'restaurantFactory',
}

@Injectable()
export class CallerService {
  constructor(private readonly restaurantFactory: RestaurantFactory) {}

  read(callType: CallType, input?: any): Promise<any> {
    return this[callType].read(input);
  }
}
