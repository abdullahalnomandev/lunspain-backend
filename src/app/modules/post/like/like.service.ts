import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import QueryBuilder from '../../../builder/QueryBuilder';
import { Like } from './like.model';

const createLike = async (postId: string, userId: string) => {
  // Check if like already exists
  const existingLike = await Like.findOne({ post: postId, user: userId });

  if (existingLike) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You have already liked this post'
    );
  }

  const like = await Like.create({ post: postId, user: userId });
  return like;
};

const deleteLike = async (postId: string, userId: string) => {
  const like = await Like.findOneAndDelete({ post: postId, user: userId });

  if (!like) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Like not found');
  }

  return like;
};

const getLikesByPost = async (
  postId: string,
  query: Record<string, unknown>
) => {
  const likeQuery = new QueryBuilder(
    Like.find({ post: postId }).populate(
      'user',
      'profile.username profile.firstName profile.lastName avatar'
    ),
    query
  )
    .paginate()
    .fields()
    .filter()
    .sort();

  const result = await likeQuery.modelQuery;
  const pagination = await likeQuery.getPaginationInfo();

  return {
    data: result,
    pagination,
  };
};

const hasUserLiked = async (postId: string, userId: string) => {
  const like = await Like.findOne({ post: postId, user: userId });
  return !!like;
};

export const LikeService = {
  createLike,
  deleteLike,
  getLikesByPost,
  hasUserLiked,
};
