import { UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ValidationPipe as CustomValidationPipe } from '../shared/pipe/validation.pipe';
import { CreatePetDto, UpdatePetDto } from './pet.dto';
import { Pet, PetID } from './pet.schema';
import { PetService } from './pet.service';

@Resolver(() => Pet)
export class PetResolver {
  constructor(private petService: PetService) {}

  // Define Return Type on the GraphQL, use the bracket signs to represent an array data
  @Query(() => [Pet])
  async pets(): Promise<Pet[]> {
    return this.petService.list();
  }

  @Query(() => Pet)
  async pet(@Args('id') id: string): Promise<Pet> {
    return this.petService.get(id);
  }

  @Mutation(() => PetID)
  async deletePet(@Args('id') id: string) {
    return this.petService.del(id);
  }

  @UsePipes(CustomValidationPipe)
  @Mutation(() => Pet)
  async createPet(
    @Args('input')
    $input: CreatePetDto,
  ): Promise<Pet> {
    return this.petService.create($input);
  }

  @UsePipes(CustomValidationPipe)
  @Mutation(() => Pet)
  async updatePet(
    @Args('id')
    id: string,
    @Args('input')
    $input: UpdatePetDto,
  ): Promise<Pet> {
    return this.petService.update(id, $input);
  }
}
