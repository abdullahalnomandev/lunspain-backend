import { model, Schema } from 'mongoose';
import { ICoupon, ICouponModel } from './coupon.interface';

const couponSchema = new Schema<ICoupon, ICouponModel>(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ['percent', 'fixed'],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// couponSchema.index({ code: 1 });

export const Coupon = model<ICoupon, ICouponModel>('Coupon', couponSchema);

