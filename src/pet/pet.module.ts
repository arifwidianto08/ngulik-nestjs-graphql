import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetCategoryModule } from './category/category.module';
import { PetCategory, PetCategorySchema } from './category/category.schema';
import { PetResolver } from './pet.resolver';
import { Pet, PetSchema } from './pet.schema';
import { PetService } from './pet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pet.name, schema: PetSchema },
      { name: PetCategory.name, schema: PetCategorySchema },
    ]),
    PetCategoryModule,
  ],
  providers: [PetService, PetResolver],
})
export class PetModule {}
