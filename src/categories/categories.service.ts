import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { category } = createCategoryDto;

    const foundCategory = await this.categoryModel.findOne({ category }).exec();

    if (foundCategory) {
      throw new BadRequestException(`Category ${category} already registered`);
    }

    const createCategory = new this.categoryModel(createCategoryDto);
    return await createCategory.save();
  }

  async consultCategories(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async consultCategory(category: string): Promise<Category> {
    const foundCategory = await this.categoryModel.findOne({ category });

    if (!foundCategory) {
      throw new NotFoundException('Category does not exists');
    }

    return foundCategory;
  }

  async updateCategory(
    category: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const foundCategory = await this.categoryModel.findOne({ category });

    if (!foundCategory) {
      throw new NotFoundException('Category does not exists');
    }

    const updateCategory = await this.categoryModel.findOneAndUpdate(
      { category },
      { $set: updateCategoryDto },
    );

    return updateCategory;
  }
}
