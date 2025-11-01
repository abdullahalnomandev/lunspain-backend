import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ClubService } from './club.service';

const createClub = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await ClubService.createClub(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Club created successfully',
      data: result,
    });
  }
);

const getAllClubs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, any>;
  const { result } = await ClubService.getAllClubs(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Clubs retrieved successfully',
    data: result,
  });
});

const getSingleClub = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClubService.getSingleClub(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Club retrieved successfully',
    data: result,
  });
});

const updateClub = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await ClubService.updateClub(id, payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Club updated successfully',
      data: result,
    });
  }
);

const deleteClub = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ClubService.deleteClub(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Club deleted successfully',
    data: result,
  });
});

const addMemberToClub = catchAsync(async (req: Request, res: Response) => {
  const { clubId } = req.params;
  const { userId, role } = req.body;
  const result = await ClubService.addMemberToClub(clubId, userId, role);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Member added to club successfully',
    data: result,
  });
});

const removeMemberFromClub = catchAsync(async (req: Request, res: Response) => {
  const { clubId, userId } = req.params;
  const result = await ClubService.removeMemberFromClub(clubId, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Member removed from club successfully',
    data: result,
  });
});

const getClubsByCreator = catchAsync(async (req: Request, res: Response) => {
  const { creatorId } = req.params;
  const result = await ClubService.getClubsByCreator(creatorId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Clubs by creator retrieved successfully',
    data: result,
  });
});

export const ClubController = {
  createClub,
  getAllClubs,
  getSingleClub,
  updateClub,
  deleteClub,
  addMemberToClub,
  removeMemberFromClub,
  getClubsByCreator,
};
