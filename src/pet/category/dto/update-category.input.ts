import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreatePetCategoryInput } from './create-category.input';

@InputType()
export class UpdatePetCategoryInput extends PartialType(
  CreatePetCategoryInput,
) {
  @Field(() => ID)
  id: string;
}
