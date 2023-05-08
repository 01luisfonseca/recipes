import { CallerInterface } from '../caller.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from '../../../schemas/restaurant.schema';
import * as RestaurantsJSON from '../../../mockups/restaurants.mockup.json';

@Injectable()
export class RestaurantFactory implements CallerInterface {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async read(input: any): Promise<Restaurant[]> {
    return (await this.restaurantModel.find(input).exec()).map((restaurant) =>
      restaurant.toJSON(),
    );
  }

  async seed(): Promise<any> {
    console.log('Seeding Restaurants');
    console.log('-------------------');
    const time = Date.now();
    const results = {
      created: 0,
      alreadyExists: 0,
    };
    for (const restaurant of RestaurantsJSON) {
      if (!(await this.restaurantModel.exists({ name: restaurant.name }))) {
        const newRestaurant = new this.restaurantModel(restaurant);
        await newRestaurant.save();
        console.log('Restaurant ' + restaurant.name + ' created');
        results.created++;
      } else {
        console.log('Restaurant ' + restaurant.name + ' already exists');
        results.alreadyExists++;
      }
    }
    console.log('-------------------');
    console.log('Seeding Restaurants took ' + (Date.now() - time) + 'ms');
    return results;
  }
}
