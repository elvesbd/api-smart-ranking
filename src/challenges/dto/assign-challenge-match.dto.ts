import { IsNotEmpty } from 'class-validator';
import { Player } from '../../players/interfaces/player.interface';
import { Result } from '../interfaces/result.interface';

export class AssignChallengeMatchDto {
  @IsNotEmpty()
  winner: Player;

  @IsNotEmpty()
  result: Result[];
}
