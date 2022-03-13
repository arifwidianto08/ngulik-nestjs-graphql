import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PetDocument = Pet & Document;

@ObjectType()
export class PetID {
  @Field(() => ID)
  id: string;
}

@Schema()
@ObjectType()
export class Pet extends PetID {
  @Prop({
    required: true,
  })
  @Field()
  name: string;

  @Prop()
  @Field({
    nullable: true,
  })
  type?: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
