import { Injectable } from '@nestjs/common';
import { RestaurantFactory } from './factories/restaurant.factory';
import { RecipeFactory } from './factories/recipe.factory';

export enum CallType {
  restaurant = 'restaurantFactory',
  recipe = 'recipeFactory',
}

@Injectable()
export class CallerService {
  constructor(
    private readonly restaurantFactory: RestaurantFactory,
    private readonly recipeFactory: RecipeFactory,
  ) {}

  read(callType: CallType, input?: any): Promise<any> {
    return this[callType].read(input);
  }
}
