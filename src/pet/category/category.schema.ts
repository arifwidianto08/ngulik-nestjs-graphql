import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PetCategoryDocument = PetCategory & Document;

@ObjectType()
export class PetCategoryID {
  @Field(() => ID)
  id: string;
}

@Schema({
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
@ObjectType()
export class PetCategory extends PetCategoryID {
  @Prop({
    required: true,
  })
  @Field()
  name: string;
}

export const PetCategorySchema = SchemaFactory.createForClass(PetCategory);
