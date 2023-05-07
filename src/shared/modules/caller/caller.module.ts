import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CallerService } from './caller.service';
import { Restaurant, RestaurantSchema } from '../../schemas/restaurant.schema';
import { RestaurantFactory } from './factories/restaurant.factory';
import { RecipeFactory } from './factories/recipe.factory';
import { Recipe, RecipeSchema } from '../../schemas/recipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Recipe.name, schema: RecipeSchema },
    ]),
  ],
  providers: [CallerService, RestaurantFactory, RecipeFactory],
  exports: [CallerService],
})
export class CallerModule {}
