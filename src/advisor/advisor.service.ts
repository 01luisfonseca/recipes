import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  CallType,
  CallerService,
} from '../shared/modules/caller/caller.service';
import { ValorationCriteriaDto } from './dto/valorationCriteria.dto';
import { ValorationResultsDto } from './dto/valorationResults.dto';
import { Restaurant } from '../shared/schemas/restaurant.schema';
import { Recipe } from '../shared/schemas/recipe.schema';

@Injectable()
export class AdvisorService {
  constructor(private callerSrv: CallerService) {}

  private async restaurantAdvice({
    concept,
    category,
  }: ValorationCriteriaDto): Promise<Restaurant[]> {
    if (!concept?.length && !category?.length) return [];
    let restaurantFilter = {};
    if (concept?.length) {
      restaurantFilter = {
        ...restaurantFilter,
        concept: { $all: concept },
      };
    }
    if (category?.length) {
      restaurantFilter = {
        ...restaurantFilter,
        category: { $in: category },
      };
    }
    let restaurants = [];
    if (Object.keys(restaurantFilter).length) {
      restaurants = (
        await this.callerSrv.read(CallType.restaurant, restaurantFilter)
      )
        .map((restaurant: Restaurant) => {
          let score = 0;
          for (const conspt of restaurant.concept) {
            if (concept?.length && concept.includes(conspt)) {
              score++;
            }
          }
          if (category?.length && category.includes(restaurant.category)) {
            score++;
          }
          restaurant.score =
            score / ((concept?.length || 0) + (category?.length || 0));
          return restaurant;
        })
        .sort((a, b) => b.score - a.score);
    }
    return restaurants;
  }

  private async recipeAdvice(
    restaurants: Restaurant[],
    { taste, temperature, category, concept }: ValorationCriteriaDto,
  ): Promise<Recipe[]> {
    if ((category?.length || concept?.length) && !restaurants?.length)
      return [];
    let recipeFilter = {};
    if (restaurants?.length) {
      recipeFilter = {
        ...recipeFilter,
        restaurant: { $in: restaurants.map((r) => r._id) }, // TODO: Check if it works
      };
    }
    if (taste?.length) {
      recipeFilter = {
        ...recipeFilter,
        taste: { $all: taste },
      };
    }
    if (temperature) {
      recipeFilter = {
        ...recipeFilter,
        temperature,
      };
    }
    let recipes = [];
    if (Object.keys(recipeFilter).length) {
      recipes = (await this.callerSrv.read(CallType.recipe, recipeFilter))
        .map((recipe: Recipe) => {
          let score = 0;
          for (const tst of recipe.taste) {
            if (taste.includes(tst)) {
              score++;
            }
          }
          if (temperature === recipe.temperature) {
            score++;
          }
          recipe.score = score / ((taste?.length || 0) + (temperature ? 1 : 0));
          return recipe;
        })
        .sort((a, b) => b.score - a.score);
    }
    return recipes;
  }

  async advice(body: ValorationCriteriaDto): Promise<ValorationResultsDto> {
    const results: ValorationResultsDto = {};
    const restaurants = await this.restaurantAdvice(body);
    const recipes = await this.recipeAdvice(restaurants, body);
    if (
      !body.concept?.length &&
      !body.category?.length &&
      !body.taste?.length &&
      !body.temperature
    )
      throw new BadRequestException('No evaluation criteria provided');
    if (body.withRestaurant) {
      results.restaurant = restaurants[0];
    }
    if (body.withRecipe || (!body.withRestaurant && !body.withRecipe)) {
      results.recipe = recipes[0];
    }
    if (
      Object.keys(results).length === 0 ||
      (!results.restaurant && !results.recipe)
    ) {
      throw new NotFoundException('No results found');
    }
    return results;
  }
}
