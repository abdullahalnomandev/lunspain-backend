import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Comment } from './comment.model';
import { IComment } from './comment.interface';

// Create a new comment
const createComment = async (payload: IComment) => {
  

    console.log(payload)
  if (!payload.post) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Post id is required');
  }
  if (!payload.creator) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Comment creator is required');
  }
  if (!payload.text) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Comment text is required');
  }

  const comment = await Comment.create(payload);
  return comment;
};

// Update a comment by ID
const updateComment = async (
  userId: string, 
  commentId: string, 
  payload: Partial<IComment>
) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Comment not found');
  }

  if (comment.creator.toString() !== userId) {
    throw new ApiError(StatusCodes.FORBIDDEN, "You aren't the owner of this comment");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    payload,
    { new: true }
  );

  if (!updatedComment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Comment not found');
  }
  return updatedComment;
};

// Find a comment by ID
const findById = async (id: string) => {
  const comment = await Comment.findById(id).lean();
  if (!comment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Comment not found');
  }
  return comment;
};

// Delete a comment by ID
const deleteComment = async (id: string) => {
  const deletedComment = await Comment.findByIdAndDelete(id);
  if (!deletedComment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Comment not found');
  }
  return deletedComment;
};

const getALlCommentsByPost = async (postId: string) => {
  const comments = await Comment.find({ post: postId }).lean();
  return comments;
};

export const CommentService = {
  createComment,
  updateComment,
  findById,
  deleteComment,
  getALlCommentsByPost
};