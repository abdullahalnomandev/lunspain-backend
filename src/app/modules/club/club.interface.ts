import { Model, Schema } from 'mongoose';
import { CLUB_ROLE } from './club.constant';

export type IClub = {
  name: string;
  description?: string;
  website?: string;
  address?: string;
  club_creator: Schema.Types.ObjectId;
  stablished_date: Date;
  country: string;
  post_code: string;
  club_specilaity: [string];
  club_members: [
    {
      role: CLUB_ROLE.USER | CLUB_ROLE.CLUB_MANAGER;
      user_id: Schema.Types.ObjectId;
    }
  ];
  image: string;
  cover_image: string;
};
export type ClubModel = Model<IClub, Record<string, unknown>>;