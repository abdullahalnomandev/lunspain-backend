import { Model, Types } from 'mongoose';

export type ITag = {
  name: string;
  category?: Types.ObjectId;
  short_code?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ITagModel = Model<ITag>;
