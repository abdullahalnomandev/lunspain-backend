import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { getSingleFilePath } from '../../../shared/getFilePath';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const {email,password, confirm_password,google_id_token,auth_provider } = req.body;

    const result = await UserService.createUserToDB({email,password,confirm_password,google_id_token,auth_provider});

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'User created successfully'
    });
  }
);

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserProfileFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

//update profile
const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let image = getSingleFilePath(req.files, 'image');
    let cover_image = getSingleFilePath(req.files, 'cover_image');

    const data: any = {
      ...req.body,
    };

    if (image && image !== 'undefined') {
      data.image = image;
    }
    if (cover_image && cover_image !== 'undefined') {
      data.cover_image = cover_image;
    }

    const result = await UserService.updateProfileToDB(user, data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);

const updateSkypeProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.updateSkypeProfileToDB(user);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated skyped successfully.'
    });
  }
);

export const UserController = { createUser, getUserProfile, updateProfile, updateSkypeProfile };
