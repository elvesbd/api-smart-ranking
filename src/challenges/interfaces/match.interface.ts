import { Player } from 'src/players/interfaces/player.interface';
import { Result } from './result.interface';

export interface Match extends Document {
  category: string;
  players: Player[];
  def: Player;
  result: Result;
}
