import { Document } from 'mongoose';

export interface Player extends Document {
  readonly email: string;
  phone: string;
  name: string;
  ranking: string;
  rankingPosition: number;
  urlPhotoPlayer: string;
}
