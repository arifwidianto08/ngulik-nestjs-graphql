import { Field, InputType, PartialType } from '@nestjs/graphql';
import { string } from 'joiful';

@InputType()
export class GetDetailPetDto {
  @string().required()
  id: string;
}

@InputType()
export class CreatePetDto {
  @Field()
  @string().required()
  name: string;

  @Field({
    nullable: true,
  })
  @string().optional().allow(null)
  type?: string;
}

@InputType()
export class UpdatePetDto extends PartialType(CreatePetDto) {}
