import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    dateHourChallenge: { type: Date },
    status: { type: String },
    dateHourRequest: { type: Date },
    dateHourResponse: { type: Date },
    challenger: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: String },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  },
  { timestamps: true, collection: 'challenges' },
);
