import { Model } from 'mongoose';

export type ICoupon = {
  _id?: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ICouponModel = Model<ICoupon>;