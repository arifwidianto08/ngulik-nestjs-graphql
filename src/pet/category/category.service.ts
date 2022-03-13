import { Injectable } from '@nestjs/common';
import { CreatePetCategoryInput } from './dto/create-category.input';
import { UpdatePetCategoryInput } from './dto/update-category.input';

@Injectable()
export class PetCategoryService {
  create(createPetCategoryInput: CreatePetCategoryInput) {
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: string, updatePetCategoryInput: UpdatePetCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
