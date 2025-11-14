import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import QueryBuilder from '../../../builder/QueryBuilder';
import { Post } from '../post.model';
import { IComment } from './comment.interface';
import { Comment } from './comment.model';
import { createNotification } from './comment.notificaiton.service';
import { Notification } from '../../notification/notification.mode';

// Create a new comment
const createComment = async (payload: IComment) => {
  const post = await Post.findById(payload.post);
  if (!post) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Post id is not valid');
  }
  if (!payload.creator) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Comment creator is required');
  }
  if (!payload.text && !payload.image) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Comment text or image is required'
    );
  }

  const comment = await Comment.create(payload);
  // SEND NOTIFICATION
  createNotification({
    sender: payload.creator.toString(),
    refId: payload.post.toString(),
    deleteReferenceId:comment._id,
    receiver:(post as any).creator.toString(),
  })
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
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You aren't the owner of this comment"
    );
  }

  const updatedComment = await Comment.findByIdAndUpdate(commentId, payload, {
    new: true,
  });

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
const deleteComment = async (id: string,userId:string) => {
  const deletedComment = await Comment.findByIdAndDelete(id);
  if (!deletedComment) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Comment not found');
  }
    Notification.deleteOne({ deleteReferenceId: deletedComment._id, sender: userId }).exec();
  
  return deletedComment;
};

const getALlCommentsByPost = async (
  postId: string,
  query: Record<string, unknown>
) => {
  const userQuery = new QueryBuilder(Comment.find({post:postId}), query)
    .paginate()
    // .search(userSearchableField)
    .fields()
    .filter()
    .sort();

  const result = await userQuery.modelQuery.populate('creator', 'profile.username profile.firstName profile.lastName profile.image');

  const pagination = await userQuery.getPaginationInfo();
  return {
    pagination,
    data: result,
  };
};

export const CommentService = {
  createComment,
  updateComment,
  findById,
  deleteComment,
  getALlCommentsByPost,
};
