import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { Event } from './event.interface';

export interface Category extends Document {
  readonly category: string;
  description: string;
  events: Event[];
  players: Player[];
}
