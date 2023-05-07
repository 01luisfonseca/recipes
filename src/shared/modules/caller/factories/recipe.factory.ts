import { CallerInterface } from '../caller.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from '../../../schemas/recipe.schema';
import { Restaurant } from '../../../schemas/restaurant.schema';
import * as RecipesJSON from '../../../mockups/recipes.mockup.json';

@Injectable()
export class RecipeFactory implements CallerInterface {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  private randomElement(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  async read(input: any): Promise<Recipe[]> {
    return await this.recipeModel.find(input).exec();
  }

  async seed(): Promise<any> {
    console.log('Seeding Recipes');
    console.log('-------------------');
    const time = Date.now();
    const restaurants = await this.restaurantModel.find().exec();
    const results: any = {};
    for (let i = 0; i < RecipesJSON.length; i++) {
      const recipe = RecipesJSON[i] as Recipe;
      const selectedRestaurant = this.randomElement(restaurants);
      if (
        !results[selectedRestaurant.name] &&
        results[selectedRestaurant.name] !== 0
      )
        results[selectedRestaurant.name] = 0;
      results[selectedRestaurant.name]++;
      recipe.restaurant = selectedRestaurant;
      const newRecipe = new this.recipeModel(recipe);
      await newRecipe.save();
    }
    console.log('-------------------');
    console.log('Seeding Recipes took ' + (Date.now() - time) + 'ms');
    return results;
  }
}
