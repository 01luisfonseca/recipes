import { Injectable } from '@nestjs/common';
import { RestaurantFactory } from './factories/restaurant.factory';

export enum CallType {
  restaurant = 'restaurantFactory',
}

@Injectable()
export class CallerService {
  constructor(private readonly restaurantFactory: RestaurantFactory) {}

  read(callType: CallType, input): Promise<any> {
    return this[CallType[callType]].read(input);
  }
}
