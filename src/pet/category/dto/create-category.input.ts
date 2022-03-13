import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePetCategoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
