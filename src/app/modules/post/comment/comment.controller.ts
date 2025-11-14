import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../../shared/catchAsync';
import { getSingleFilePath } from '../../../../shared/getFilePath';
import sendResponse from '../../../../shared/sendResponse';
import { CommentService } from './comment.service';

// Create a new comment
const createComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    let image = getSingleFilePath(req.files, 'image');

    const data: any = {
      ...req.body,
      creator: user?.id,
    };

    if (image && image !== 'undefined') {
      data.image = image;
    }
    const result = await CommentService.createComment(data);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Comment created successfully',
      data: result,
    });
  }
);

// Get all comments (with basic query support)
const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getALlCommentsByPost(
    req.params.id,
    req.query
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Comments retrieved successfully',
    data: result.data,
    pagination: result.pagination,
  });
});

// Get a single comment by ID
const getSingleComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CommentService.findById(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Comment retrieved successfully',
    data: result,
  });
});

// Update a comment by ID
const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let image = getSingleFilePath(req.files, 'image');
    const data: any = { ...req.body };
    if (image && image !== 'undefined') {
      data.image = image;
    }

    const result = await CommentService.updateComment(
      req.user?.id,
      req.params.id,
      data
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Comment updated successfully',
      data: result,
    });
  }
);

// Delete a comment by ID
const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  await CommentService.deleteComment(id,userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Comment deleted successfully',
  });
});

export const CommentController = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};
