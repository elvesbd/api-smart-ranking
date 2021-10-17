import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
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
    return this.categoryModel.find().populate('players');
  }

  async consultCategory(category: string): Promise<Category> {
    const foundCategory = await this.categoryModel.findOne({ category });

    if (!foundCategory) {
      throw new NotFoundException('Category does not exists');
    }

    return foundCategory;
  }

  async consultCategoryByPlayer(idPlayer: any): Promise<Category> {
    const players = await this.playersService.findAllPlayers();

    const playerFilter = players.filter((player) => player._id == idPlayer);

    if (playerFilter.length == 0) {
      throw new BadRequestException(`The id: ${idPlayer} is not player!`);
    }

    return await this.categoryModel
      .findOne()
      .where('players')
      .in(idPlayer)
      .exec();
  }

  async updateCategory(
    category: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const foundCategory = await this.categoryModel.findOne({ category });

    if (!foundCategory) {
      throw new NotFoundException('Category does not exists');
    }

    await this.categoryModel.findOneAndUpdate(
      { category },
      { $set: updateCategoryDto },
    );

    return;
  }

  async assignPlayerInCategory(params: string[]): Promise<void> {
    const category = params['category'];
    const idPlayer = params['idPlayer'];

    const foundCategory = await this.categoryModel.findOne({ category });

    const foundPlayerInCategory = await this.categoryModel
      .find({ category })
      .where('players')
      .in(idPlayer);

    if (foundPlayerInCategory.length > 0) {
      throw new BadRequestException(
        `Player with id: ${idPlayer} already registered in category ${category}`,
      );
    }

    await this.playersService.findPlayerById(idPlayer);

    if (!foundCategory) {
      throw new NotFoundException(`Uncreated category ${category}!`);
    }

    foundCategory.players.push(idPlayer);
    await this.categoryModel.findOneAndUpdate(
      { category },
      { $set: foundCategory },
    );
  }
}
