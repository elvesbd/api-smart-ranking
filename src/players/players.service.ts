import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;

    const foundPlayer = await this.playerModel.findOne({ email }).exec();

    if (foundPlayer) {
      throw new BadRequestException(
        `There is already a registered player with ${email}`,
      );
    }

    const createPlayer = new this.playerModel(createPlayerDto);
    return await createPlayer.save();
  }

  async findAllPlayers(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async findPlayerById(id: string): Promise<Player> {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const player = await this.playerModel.findById(id);
      return player;
    } else {
      throw new NotFoundException('Player not found');
    }
  }

  async updatePlayerById(
    id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    /* await this.playerModel.updateOne({ _id: id }, updatePlayerDto).exec();
    return this.findPlayerById(id); */
    return await this.playerModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updatePlayerDto,
      },
      {
        new: true,
      },
    );
  }

  async deletePlayerById(id: string) {
    try {
      return await this.playerModel.deleteOne({ _id: id }).exec();
    } catch (err) {
      throw new InternalServerErrorException({
        message: `Player with ID: ${id} does not exists!`,
      });
    }
  }
}
