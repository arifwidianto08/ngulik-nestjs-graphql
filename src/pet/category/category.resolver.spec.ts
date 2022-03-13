import { Test, TestingModule } from '@nestjs/testing';
import { PetCategoryResolver } from './category.resolver';
import { PetCategoryService } from './category.service';

describe('PetCategoryResolver', () => {
  let resolver: PetCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetCategoryResolver, PetCategoryService],
    }).compile();

    resolver = module.get<PetCategoryResolver>(PetCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
