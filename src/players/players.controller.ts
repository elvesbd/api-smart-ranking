import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationParamsPipes } from 'src/shared/pipes/validation-params.pipes';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Get()
  async findAllPlayers(): Promise<Player[]> {
    return this.playersService.findAllPlayers();
  }

  @Get(':id')
  findPlayerById(@Param('id') id: string): Promise<Player> {
    return this.playersService.findPlayerById(id);
  }

  @Patch(':id')
  updatePlayerById(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playersService.updatePlayerById(id, updateCourseDto);
  }

  @Delete(':id')
  deletePlayerById(@Param('id', ValidationParamsPipes) id: string) {
    return this.playersService.deletePlayerById(id);
  }
}
