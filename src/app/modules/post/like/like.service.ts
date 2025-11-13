import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import QueryBuilder from '../../../builder/QueryBuilder';
import { Like } from './like.model';
import { Post } from '../post.model';
import { User } from '../../user/user.model';
import { Notification } from '../../notification/notification.mode';
import dayjs from 'dayjs';
import { CREATOR_TYPE } from '../post.constant';
import { ClubNotificationSettings } from '../../club/notificaiton_settings/notification_settings.model';
import { Club } from '../../club/club.model';
import { IClubNotificationSettings } from '../../club/notificaiton_settings/notifation_sttings.interface';
import { NOTIFICATION_OPTION } from '../../club/notificaiton_settings/notification_settings.constant';
import { Follower } from '../../user/follower/follower.model';

const createLike = async (postId: string, userId: string) => {
  // Check if like already exists
  const existingLike = await Like.findOne({ post: postId, user: userId });

  if (existingLike) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You have already liked this post'
    );
  }

  // // Create the like
  const like = await Like.create({ post: postId, user: userId });
  await like.populate('post', 'creator creator_type club');

  // Get the post owner (receiver of the notification)
  const creator = (like.post as any).creator;
  const creatorType = (like.post as any)?.creator_type;
  const club = (like.post as any)?.club;
  const getClubInfo = await Club.findById(club,'notification_settings').lean()
  const clubNotificaiton = await ClubNotificationSettings.findById(getClubInfo?.notification_settings) as IClubNotificationSettings;

  const isFollowed = await Follower.findOne({ following: userId, follower: creator })
  console.log({clubNotificaiton})

  if (creatorType === CREATOR_TYPE.CLUB && clubNotificaiton.likes_on_your_posts === NOTIFICATION_OPTION.FROM_EVERYONE && creator.toString() !== userId) {

    const notificaiton = Notification.create({
      receiver: (like.post as any).creator,
      sender: userId,
      title: "Liked on your post",
      refId: postId,
      path: "/post/like"
    });
    if (!notificaiton) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'somthing went wrong to give notification from like.');
    }
  }
  // else if (creatorType === CREATOR_TYPE.CLUB && clubNotificaiton.likes_on_your_posts === NOTIFICATION_OPTION.FROM_PROFILES_I_FOLLOW && isFollowed && creator.toString() !== userId) {

  //   const notificaiton = Notification.create({
  //     receiver: (like.post as any).creator,
  //     sender: userId,
  //     title: "Liked on your post",
  //     refId: postId,
  //     path: "/post/like"
  //   });
  //   if (!notificaiton) {
  //     throw new ApiError(StatusCodes.BAD_REQUEST, 'somthing went wrong to give notification from like.');
  //   }
  // }
  // else if (creatorType === CREATOR_TYPE.USER && creator.toString() !== userId) {
  //   const notificaiton = Notification.create({
  //     receiver: (like.post as any).creator,
  //     sender: userId,
  //     title: "Liked on your post",
  //     refId: postId,
  //     path: "/post/like"
  //   });


  //   if (!notificaiton) {
  //     throw new ApiError(StatusCodes.BAD_REQUEST, 'somthing went wrong to give notification from like.');
  //   }
  // }

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
