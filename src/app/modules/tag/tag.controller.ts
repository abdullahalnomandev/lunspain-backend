import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TagService } from './tag.service';
import { Tag } from './tag.model';

const createTag = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TagService.createTag(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Tag created successfully',
      data: result,
    });
  }
);

const getAllTags = catchAsync(async (req: Request, res: Response) => {
  const { pagination, data } = await TagService.getAllTags(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Tags retrieved successfully',
    pagination,
    data,
  });
});

const getSingleTag = catchAsync(async (req: Request, res: Response) => {
  const result = await TagService.getSingleTag(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Tag retrieved successfully',
    data: result,
  });
});

const updateTag = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TagService.updateTag(req.params.id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Tag updated successfully',
      data: result,
    });
  }
);

const deleteTag = catchAsync(async (req: Request, res: Response) => {
  const result = await TagService.deleteTag(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Tag deleted successfully',
    data: result,
  });
});

export const TagController = {
  createTag,
  getAllTags,
  getSingleTag,
  updateTag,
  deleteTag,
};



