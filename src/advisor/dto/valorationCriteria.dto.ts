import {
  IsBoolean,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
  IsIn,
} from 'class-validator';
import { TasteType, TemperatureType } from '../../shared/schemas/recipe.schema';
import { FoodType } from '../../shared/schemas/restaurant.schema';

export class ValorationCriteriaDto {
  @IsOptional()
  @IsBoolean()
  withRestaurant?: boolean;

  @IsOptional()
  @IsBoolean()
  withRecipe?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsIn(Object.values(FoodType))
  concept?: FoodType[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsIn([1, 2, 3, 4, 5])
  category?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  @IsIn(Object.values(TasteType))
  taste?: TasteType[];

  @IsOptional()
  @IsString()
  @IsIn(Object.values(TemperatureType))
  temperature?: TemperatureType;
}
