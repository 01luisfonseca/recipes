import { CallerInterface } from '../caller.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from '../../../schemas/recipe.schema';

@Injectable()
export class RecipeFactory implements CallerInterface {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async read(input: any): Promise<Recipe[]> {
    return await this.recipeModel.find(input).exec();
  }
}
