import { Module } from '@nestjs/common';
import { PetCategoryResolver } from './category.resolver';
import { PetCategoryService } from './category.service';

@Module({
  providers: [PetCategoryResolver, PetCategoryService],
})
export class PetCategoryModule {}
