import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private readonly Logger = new Logger(PlayersService.name);

  private players: Player[] = [];

  createPlayer(createPlayerDto: CreatePlayerDto): void {
    const { name, phone, email } = createPlayerDto;

    const player: Player = {
      _id: uuid(),
      name,
      phone,
      email,
      ranking: 'A',
      rankingPosition: 1,
      urlPhotoPlayer: 'http://www.google.com/photo.png',
    };
    this.Logger.log(player);
    this.players.push(player);
  }

  async findAllPlayers(): Promise<Player[]> {
    return this.players;
  }

  updatePlayer(foundPlayer: Player, createPlayerDto: CreatePlayerDto): void {
    const { name } = createPlayerDto;

    foundPlayer.name = name;
  }
}
