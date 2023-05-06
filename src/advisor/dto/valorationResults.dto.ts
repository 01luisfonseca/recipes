import { Recipe } from '../../shared/schemas/recipe.schema';
import { Restaurant } from '../../shared/schemas/restaurant.schema';

export class ValorationResultsDto {
  restaurant?: Restaurant;
  recipe?: Recipe;
}
