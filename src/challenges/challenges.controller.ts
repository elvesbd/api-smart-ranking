import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './interfaces/challenge.interface';

@UsePipes(ValidationPipe)
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengeService: ChallengesService) {}

  private readonly logger = new Logger(ChallengesController.name);

  @Post()
  async createChallenge(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    return await this.challengeService.createChallenge(createChallengeDto);
  }

  /* @Get()
  async consultChallenges() {
    return await this.challengeService.consultChallenges();
  } */

  @Put(':challenge')
  async updateChallenge() {}

  @Post(':challenge/match')
  async assignChallengeMatch() {}

  @Delete(':id')
  async deleteChallenge() {}
}
