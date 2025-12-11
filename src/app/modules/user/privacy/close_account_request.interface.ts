import { Model, Schema } from 'mongoose';

export enum CLOSING_STATUS {
  PENDING = 'pending',
  CLOSED = 'closed',
}

export type ICloseAccountRequest = {
  _id: Schema.Types.ObjectId;
  marketing_permission: boolean;
  feedback: string;
  closing_status: CLOSING_STATUS;
  account: Schema.Types.ObjectId;
  requested_user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type CloseAccountRequestModel = Model<ICloseAccountRequest, Record<string, unknown>>;
