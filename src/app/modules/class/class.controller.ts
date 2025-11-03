import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { getSingleFilePath } from '../../../shared/getFilePath';
import { ClassService } from './class.service';

const createClass = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.user?.id;
        const result = await ClassService.createClass({...req.body,creator:userId});

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: 'Class created successfully',
            data: result,
        });
    }
);



export const ClassController = {
    createClass
};
