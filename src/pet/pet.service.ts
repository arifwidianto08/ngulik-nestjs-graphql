import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePetDto, UpdatePetDto } from './pet.dto';
import { Pet, PetDocument, PetID } from './pet.schema';

@Injectable()
export class PetService {
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  async get(id: string): Promise<PetDocument> {
    const pet = await this.petModel.findById(id);
    return pet;
  }

  async del(id: string): Promise<PetID> {
    await this.petModel.findByIdAndRemove(id);
    return { id };
  }

  async create($input: CreatePetDto): Promise<PetDocument> {
    const pet = new this.petModel();

    pet.name = $input.name;
    pet.type = $input.type;

    await pet.save();
    return pet;
  }

  async list(): Promise<Pet[]> {
    return await this.petModel.find();
  }

  async update(id: string, $input: UpdatePetDto): Promise<PetDocument> {
    const pet = await this.petModel.findById(id);

    if (!pet) {
      throw new NotFoundException('Pet Not Found!');
    }

    pet.name = $input.name;
    pet.type = $input.type;

    await pet.save();
    return pet;
  }
}
