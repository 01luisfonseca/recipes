import { CallerInterface } from '../caller.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from '../../../schemas/restaurant.schema';

@Injectable()
export class RestaurantFactory implements CallerInterface {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async read(input: any): Promise<Restaurant[]> {
    return await this.restaurantModel.find(input).exec();
  }
}
