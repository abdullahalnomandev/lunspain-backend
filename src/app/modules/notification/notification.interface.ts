import mongoose, { Model, Schema, Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface INotification {
  _id:Types.ObjectId;
  receiver: Schema.Types.ObjectId | IUser;
  sender: Schema.Types.ObjectId | IUser;
  title: string;
  message: string;
  refId: Schema.Types.ObjectId;
  path: string;
  seen: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type INotificationModel = Model<INotification, Record<string, unknown>>