/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CallType, CallerService } from './caller.service';
import {
  Restaurant,
  RestaurantDocument,
} from '../../schemas/restaurant.schema';
import { RestaurantFactory } from './factories/restaurant.factory';
import { Recipe, RecipeDocument } from '../..//schemas/recipe.schema';
import { RecipeFactory } from './factories/recipe.factory';

describe('CallerService', () => {
  let service: CallerService;

  beforeEach(async () => {
    const restaurantMockRepository = {
      find: () => {
        return {
          exec: jest.fn(() => [
            {
              toJSON: () => ({ name: 'demo restaurant' }),
            },
          ]),
        };
      },
    };
    const recipeMockRepository = {
      find: () => {
        return {
          exec: jest.fn(() => [
            {
              toJSON: () => ({ name: 'demo recipe' }),
            },
          ]),
        };
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallerService,
        RestaurantFactory,
        RecipeFactory,
        {
          provide: getModelToken(Restaurant.name),
          useValue: restaurantMockRepository,
        },
        {
          provide: getModelToken(Recipe.name),
          useValue: recipeMockRepository,
        },
      ],
    }).compile();

    service = module.get<CallerService>(CallerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get results of restaurant', async () => {
    await expect(service.read(CallType.restaurant)).resolves.toEqual([
      { name: 'demo restaurant' },
    ]);
  });

  it('should get results of recipe', async () => {
    await expect(service.read(CallType.recipe)).resolves.toEqual([
      { name: 'demo recipe', restaurant: { name: 'demo restaurant' } },
    ]);
  });
});
