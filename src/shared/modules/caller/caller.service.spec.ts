import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CallType, CallerService } from './caller.service';
import {
  Restaurant,
  RestaurantDocument,
} from '../../schemas/restaurant.schema';
import { RestaurantFactory } from './factories/restaurant.factory';

describe('CallerService', () => {
  let service: CallerService;
  let spyRestaurantModel: Model<RestaurantDocument>;

  beforeEach(async () => {
    const restaurantMockRepository = {
      find: () => {
        return {
          exec: jest.fn(() => [
            {
              name: 'demo',
            },
          ]),
        };
      },
      findAll: () => {
        return {
          exec: jest.fn(() => {
            return [{ name: 'demo' }];
          }),
        };
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CallerService,
        RestaurantFactory,
        {
          provide: getModelToken(Restaurant.name),
          useValue: restaurantMockRepository,
        },
      ],
    }).compile();

    service = module.get<CallerService>(CallerService);
    spyRestaurantModel = module.get<Model<RestaurantDocument>>(
      getModelToken(Restaurant.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get results', async () => {
    await expect(service.read(CallType.restaurant)).resolves.toEqual([
      { name: 'demo' },
    ]);
  });
});
