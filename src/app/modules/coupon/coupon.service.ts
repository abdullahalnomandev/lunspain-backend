import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { couponSearchableFields } from './coupon.constant';
import { ICoupon } from './coupon.interface';
import { Coupon } from './coupon.model';

const createCoupon = async (payload: ICoupon) => {
  try {
    const coupon = await Coupon.create(payload);
    return coupon;
  } catch (error: any) {
    // Duplicate key error code from MongoDB
    if (error.code === 11000 && error.keyPattern && error.keyPattern.code) {
      throw new ApiError(StatusCodes.CONFLICT, 'Coupon code already exists');
    }
    throw error;
  }
};

const getAllCoupons = async (query: Record<string, any>) => {
  const couponQuery = new QueryBuilder(Coupon.find(), query)
    .search(couponSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await couponQuery.modelQuery.lean();
  const pagination = await couponQuery.getPaginationInfo();

  return { data, pagination };
};

const getSingleCoupon = async (id: string) => {
  const coupon = await Coupon.findOne({code:id}).lean();

  if (!coupon || !coupon.active) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Coupon not found');
  }

  return coupon;
};

const updateCoupon = async (id: string, payload: Partial<ICoupon>) => {
  const updated = await Coupon.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).lean();

  if (!updated) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Coupon not found');
  }

  return updated;
};

const deleteCoupon = async (id: string) => {
  const deleted = await Coupon.findByIdAndDelete(id).lean();

  if (!deleted) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Coupon not found');
  }

  return deleted;
};

export const CouponService = {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};

