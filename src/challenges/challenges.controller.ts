import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengeStatusValidationPipe } from 'src/shared/pipes/validations-challenge-status.pipes';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
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

  @Get()
  async consultAllChallenges(
    @Query('idPlayer') _id: string,
  ): Promise<Challenge[]> {
    return _id
      ? await this.challengeService.consultChallengesByPlayer(_id)
      : await this.challengeService.consultAllChallenges();
  }

  @Put(':challenge')
  async updateChallenge(
    @Body(ChallengeStatusValidationPipe) updateChallengeDto: UpdateChallengeDto,
    @Param('challenge') _id: string,
  ): Promise<Challenge> {
    return await this.challengeService.updateChallenge(_id, updateChallengeDto);
  }

  @Post(':challenge/match')
  async assignChallengeMatch() {}

  @Delete(':id')
  async deleteChallenge() {}
}
