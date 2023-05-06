import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
  IsIn,
} from 'class-validator';
import { HydratedDocument } from 'mongoose';

export enum FoodType {
  FAST = 'Comida rápida',
  BUFFET = 'Buffet',
  GOURMET = 'Gourmet',
}

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  _id: string;

  @Prop()
  @IsString()
  name: string;

  @Prop([String])
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsIn(Object.values(FoodType))
  concept: FoodType[];

  @Prop()
  @IsNumber()
  category: number;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
