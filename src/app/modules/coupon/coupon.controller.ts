import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CouponService } from './coupon.service';

const createCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await CouponService.createCoupon(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Coupon created successfully',
      data: result,
    });
  }
);

const getAllCoupons = catchAsync(async (req: Request, res: Response) => {
  const { pagination, data } = await CouponService.getAllCoupons(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Coupons retrieved successfully',
    pagination,
    data,
  });
});

const getSingleCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await CouponService.getSingleCoupon(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Coupon retrieved successfully',
    data: result,
  });
});

const updateCoupon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await CouponService.updateCoupon(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Coupon updated successfully',
      data: result,
    });
  }
);

const deleteCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await CouponService.deleteCoupon(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Coupon deleted successfully',
    data: result,
  });
});

export const CouponController = {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};

