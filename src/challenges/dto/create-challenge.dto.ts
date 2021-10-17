import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Player } from 'src/players/interfaces/player.interface';

export class CreateChallengeDto {
  @IsDateString()
  @IsNotEmpty()
  dateHourChallenge: Date;

  @IsNotEmpty()
  challenger: Player;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Player[];
}
