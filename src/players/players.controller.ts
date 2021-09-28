import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Get()
  async findAllPlayers(): Promise<Player[]> {
    return this.playersService.findAllPlayers();
  }

  @Get('email')
  findPlayerByEmail(@Param('email') email: string): Promise<Player> {
    return this.findPlayerByEmail(email);
  }
}
