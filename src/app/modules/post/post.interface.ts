import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { COMMENT_REACTION, CREATOR_TYPE, POST_TYPE } from './post.constant';

export type IPOST = {
  description?: string;
  image?: string;
  media?:string;
  creator?: Types.ObjectId;          
  creator_type: CREATOR_TYPE;      
  club?: Types.ObjectId; 
  tag_user?: Types.ObjectId[];       
  features_skills?: string[];
  post_type: POST_TYPE; 
  likes: [
    {
      react_type: COMMENT_REACTION;
      user: Types.ObjectId | IUser;
    }
  ];             
  createdAt?: Date;
  updatedAt?: Date;
};

export type IPostModel = Model<IPOST>;