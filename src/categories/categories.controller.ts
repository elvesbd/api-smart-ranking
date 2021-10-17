import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './interfaces/category.interface';

@UsePipes(ValidationPipe)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async consultCategories(): Promise<Category[]> {
    return await this.categoryService.consultCategories();
  }

  @Get(':category')
  async consultCategory(
    @Param('category') category: string,
  ): Promise<Category> {
    return this.categoryService.consultCategory(category);
  }

  @Put(':category')
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('category') category: string,
  ): Promise<Category> {
    return this.categoryService.updateCategory(category, updateCategoryDto);
  }

  @Post(':category/player/:idPlayer')
  async assignPlayerInCategory(@Param() params: string[]): Promise<void> {
    return await this.categoryService.assignPlayerInCategory(params);
  }
}
