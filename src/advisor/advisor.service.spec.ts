import { Test, TestingModule } from '@nestjs/testing';
import { AdvisorService } from './advisor.service';
import { CallerService } from '../shared/modules/caller/caller.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ValorationCriteriaDto } from './dto/valorationCriteria.dto';
import { FoodType } from '../shared/schemas/restaurant.schema';
import { CallType } from '../shared/modules/caller/caller.service';
import { TasteType, TemperatureType } from '../shared/schemas/recipe.schema';

describe('AdvisorService', () => {
  let service: AdvisorService;
  let callerSrv: DeepMocked<CallerService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdvisorService,
        {
          provide: CallerService,
          useValue: createMock<CallerService>(),
        },
      ],
    }).compile();

    service = module.get<AdvisorService>(AdvisorService);
    callerSrv = module.get(CallerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an object with options', async () => {
    callerSrv.read.mockImplementation((callType: CallType, ctx) => {
      if (callType === CallType.restaurant) {
        // Expected  ctx = { category: { $in: [1,2] }, concept: { $all: [FoodType.FAST] }
        if (
          ctx.category.$in.length === 2 &&
          ctx.concept.$all[0] === FoodType.FAST
        ) {
          return Promise.resolve([
            { name: 'test restaurant', concept: [FoodType.FAST], category: 1 },
          ]);
        }
      }
      if (callType === CallType.recipe) {
        // Expected  ctx = { taste: { $all: [TasteType.SWEET] }, temperature: TemperatureType.HOT }
        if (
          ctx.taste.$all[0] === TasteType.SWEET &&
          ctx.temperature === TemperatureType.HOT
        ) {
          return Promise.resolve([
            {
              name: 'test recipe',
              taste: [TasteType.SWEET],
              temperature: TemperatureType.HOT,
            },
          ]);
        }
      }
      return Promise.reject('Bad Test Process');
    });
    const body: ValorationCriteriaDto = {
      withRestaurant: true,
      withRecipe: true,
      concept: [FoodType.FAST],
      category: [1, 2],
      taste: [TasteType.SWEET],
      temperature: TemperatureType.HOT,
    };
    await expect(service.advice(body)).resolves.toEqual({
      restaurant: {
        name: 'test restaurant',
        concept: [FoodType.FAST],
        category: 1,
        score: 0.6666666666666666,
      },
      recipe: {
        name: 'test recipe',
        taste: [TasteType.SWEET],
        temperature: TemperatureType.HOT,
        score: 1,
      },
    });
  });
});
