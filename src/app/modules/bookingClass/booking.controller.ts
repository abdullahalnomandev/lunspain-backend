import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingClassService } from './booking.service';

const createBookingClass = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id;
        const result = await BookingClassService.createBookingClass({...req.body,user:userId});

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: 'Booking class created successfully',
            data: result,
        });
    }
);


const getBookingClassesByClubId = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const clubId = req.params.club_id;
        const userId = req.user?.id;
        const result = await BookingClassService.getBookingClassesByClubId(clubId,userId);

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: 'Booking classes retrieved successfully',
            data: result,
        });
    }
);



export const ClassController = {
    createBookingClass,
    getBookingClassesByClubId
};
