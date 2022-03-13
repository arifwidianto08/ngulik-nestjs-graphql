import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetCategory } from './category.schema';
import { PetCategoryService } from './category.service';
import { CreatePetCategoryInput } from './dto/create-category.input';
import { UpdatePetCategoryInput } from './dto/update-category.input';

@Resolver(() => PetCategory)
export class PetCategoryResolver {
  constructor(private readonly petCategoryService: PetCategoryService) {}

  @Mutation(() => PetCategory)
  createPetCategory(
    @Args('createPetCategoryInput')
    createPetCategoryInput: CreatePetCategoryInput,
  ) {
    return this.petCategoryService.create(createPetCategoryInput);
  }

  @Query(() => [PetCategory], { name: 'category' })
  findAll() {
    return this.petCategoryService.findAll();
  }

  @Query(() => PetCategory, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.petCategoryService.findOne(id);
  }

  @Mutation(() => PetCategory)
  updatePetCategory(
    @Args('updatePetCategoryInput')
    updatePetCategoryInput: UpdatePetCategoryInput,
  ) {
    return this.petCategoryService.update(
      updatePetCategoryInput.id,
      updatePetCategoryInput,
    );
  }

  @Mutation(() => PetCategory)
  removePetCategory(@Args('id', { type: () => Int }) id: number) {
    return this.petCategoryService.remove(id);
  }
}
