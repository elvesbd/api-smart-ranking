import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { ChallengeStatus } from '../enum/challenge-status.enum';
import { Match } from './match.interface';

export interface Challenge extends Document {
  dateHourChallenge: Date;
  status: ChallengeStatus;
  dateHourRequest: Date;
  dateHourResponse: Date;
  challenger: Player;
  category: string;
  players: Player[];
  match: Match;
}
