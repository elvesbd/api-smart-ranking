import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('players')
export class PlayersController {
  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return createPlayerDto;
  }
}