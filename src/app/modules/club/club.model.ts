import { model, Schema } from 'mongoose';
import { ClubModel, IClub } from './club.interface';
import { CLUB_ROLE } from './club.constant';

const clubSchema = new Schema<IClub, ClubModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    club_creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stablished_date: {
      type: Date,
    },
    country: {
      type: String,
    },
    post_code: {
      type: String,
    },
    club_specilaity: {
      type: [String],
      default: [],
    },
    club_members: [
      {
        role: {
          type: String,
          enum: Object.values(CLUB_ROLE),
          default: CLUB_ROLE.USER,
        },
        user_Id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        _id: false
      },
    ],
    image: {
      type: String,
    },
    cover_image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Club = model<IClub>('Club', clubSchema);