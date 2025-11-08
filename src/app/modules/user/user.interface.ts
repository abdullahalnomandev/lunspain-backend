import { Model, Types } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';

export interface IUserProfile {
  firstName?: string;
  lastName: string;
  date_of_birth: string;
  country: string;
  skills: string[];
  year_of_exprience: string;
  level_of_experience: string;
  image?: string;
  cover_image?: string;
  username?: string;
  followers?: [Types.ObjectId],
  following?: [Types.ObjectId]

}

export interface IUser {
  _id: Types.ObjectId;
  profile: (IUserProfile & { _id: Types.ObjectId });
  confirm_password?: string;
  email: string;
  password: string;
  role: USER_ROLES;
  status: 'active' | 'delete';
  verified: boolean;
  token?: string;
  google_id_token?: string;
  apple_id_token?: string;
  auth_provider: 'local' | 'google' | 'apple';
  connected_account_id?: string;
  stripe_connected_link?: string;
}

export interface UserModel extends Model<IUser> {
  isExistUserById(id: string): Promise<IUser | null>;
  isExistUserByEmail(email: string): Promise<IUser | null>;
  isMatchPassword(password: string, hashPassword: string): Promise<boolean>;
}