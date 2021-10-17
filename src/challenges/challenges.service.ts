import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { ChallengeStatus } from './enum/challenge-status.enum';
import { Challenge } from './interfaces/challenge.interface';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge')
    private readonly challengeModel: Model<Challenge>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  private readonly logger = new Logger(ChallengesService.name);

  async createChallenge(
    createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    const players = await this.playersService.findAllPlayers();

    createChallengeDto.players.map((playerDto) => {
      const playerFilter = players.filter(
        (player) => player._id == playerDto._id,
      );

      if (playerFilter.length == 0) {
        throw new BadRequestException(`Id ${playerDto._id} is not player`);
      }
    });
    const requestingPlayerIsMatch = await createChallengeDto.players.filter(
      (player) => player._id == createChallengeDto.challenger,
    );
    this.logger.debug('requestingPlayersIsMatch', requestingPlayerIsMatch);
    if (requestingPlayerIsMatch.length == 0) {
      throw new BadRequestException(`The requesting player is not matching`);
    }

    const playerCategory = await this.categoriesService.consultCategoryByPlayer(
      createChallengeDto.challenger,
    );

    if (!playerCategory) {
      throw new BadRequestException(
        'the challenger must be registered in a category.',
      );
    }

    const createChallenge = new this.challengeModel(createChallengeDto);
    createChallenge.category = playerCategory.category;
    createChallenge.dateHourRequest = new Date();
    createChallenge.status = ChallengeStatus.PENDING;

    return await createChallenge.save();
  }
}
