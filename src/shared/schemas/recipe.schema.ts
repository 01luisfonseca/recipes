import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
  IsIn,
} from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Restaurant } from './restaurant.schema';
import * as mongoose from 'mongoose';

export enum TasteType {
  BITTER = 'Amargo',
  SAVORY = 'Salado',
  SWEET = 'Dulce',
  SOUR = 'Agrio',
  SPICY = 'Picante',
  UMAMI = 'Umami',
}

export enum TemperatureType {
  HOT = 'Caliente',
  COLD = 'Frío',
}

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  _id: string;

  @Prop()
  @IsString()
  name: string;

  @Prop([String])
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  @IsIn(Object.values(TasteType))
  taste: TasteType[];

  @Prop(String)
  @IsString()
  @IsIn(Object.values(TemperatureType))
  temperature: TemperatureType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Restaurant.name })
  restaurant: Restaurant;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
