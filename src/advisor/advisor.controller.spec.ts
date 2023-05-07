import { Test, TestingModule } from '@nestjs/testing';
import { AdvisorController } from './advisor.controller';
import { AdvisorService } from './advisor.service';
import { createMock } from '@golevelup/ts-jest';

describe('AdvisorController', () => {
  let controller: AdvisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvisorController],
      providers: [
        {
          provide: AdvisorService,
          useValue: createMock<AdvisorService>(),
        },
      ],
    }).compile();

    controller = module.get<AdvisorController>(AdvisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should have advice method', () => {
    it('should return alive result', () => {
      expect(controller.advice).toBeDefined();
    });
  });
});
