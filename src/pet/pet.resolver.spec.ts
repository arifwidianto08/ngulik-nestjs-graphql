import { Test, TestingModule } from '@nestjs/testing';
import { PetResolver } from './pet.resolver';

describe('PetResolver', () => {
  let resolver: PetResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetResolver],
    }).compile();

    resolver = module.get<PetResolver>(PetResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
