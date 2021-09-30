import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  private readonly Logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = new this.playerModel(createPlayerDto);
    return await player.save();
  }

  async findAllPlayers(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async findPlayerById(id: string): Promise<Player> {
    const player = this.playerModel.findById(id).exec();

    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  async updatePlayer(
    id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    const foundPlayer = await this.playerModel
      .findByIdAndUpdate(id, updatePlayerDto)
      .exec();

    return foundPlayer;
  }

  async deletePlayerById(id: string) {
    return await this.playerModel.findOneAndDelete({ _id: id }).exec();
  }
}
