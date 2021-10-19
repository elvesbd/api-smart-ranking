import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from 'src/categories/categories.module';
import { PlayerSchema } from 'src/players/models/player.schema';
import { PlayersModule } from 'src/players/players.module';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import { ChallengeSchema } from './models/challenge.schema';
import { MatchSchema } from './models/match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Player', schema: PlayerSchema },
      { name: 'Challenge', schema: ChallengeSchema },
      { name: 'Match', schema: MatchSchema },
    ]),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
