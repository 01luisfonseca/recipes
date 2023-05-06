import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CallerService } from './caller.service';
import { Restaurant, RestaurantSchema } from '../../schemas/restaurant.schema';
import { RestaurantFactory } from './factories/restaurant.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  providers: [CallerService, RestaurantFactory],
})
export class CallerModule {}
