import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../../errors/ApiError';
import QueryBuilder from '../../../builder/QueryBuilder';
import { Like } from './like.model';
import { User } from '../../user/user.model';
import { Notification } from '../../notification/notification.mode';
import { NOTIFICATION_OPTION } from '../../user/notificaiton_settings/notification_settings.constant';
import { Follower } from '../../user/follower/follower.model';
import { sendNotification } from '../../../../shared/sendNotification';
import { IUserNotificationSettings } from '../../user/notificaiton_settings/notifation_sttings.interface';
import { createNotificationThatYouAreTagged } from '../post.util';
import { CLUB_NOTIFICATION_OPTION } from '../../club/club_notificaiton_settings/club_notification_settings.constant';
import { IClubNotificationSettings } from '../../club/club_notificaiton_settings/club_notifation_sttings.interface';
import { CREATOR_TYPE } from '../post.constant';
import { Club } from '../../club/club.model';
const createLike = async (postId: string, userId: string, fcmToken: string) => {
  const like = await Like.create({ post: postId, user: userId });
  await like.populate('post', 'creator tag_user creator_type club');

  // NOTIFICATION SECTION
  const creator = (like.post as any).creator;
  const tagUsers = (like.post as any).tag_user;
  const userNotificationSettings = await User.findById(creator, '-_id notification_settings')
    .populate('notification_settings')
    .lean();
  const { likes_on_your_posts } = userNotificationSettings?.notification_settings as IUserNotificationSettings;
  const shouldSend = likes_on_your_posts === NOTIFICATION_OPTION.FROM_EVERYONE || (likes_on_your_posts === NOTIFICATION_OPTION.FROM_PROFILES_I_FOLLOW &&
    !!(await Follower.exists({
      following: userId,
      follower: creator,
    }).lean()));


  sendNotification(shouldSend, {
    receiver: creator,
    sender: userId,
    title: 'Liked on your post',
    refId: postId,
    deleteReferenceId: like._id,
    path: '/user/post/like',
    fcmToken
  });

  createNotificationThatYouAreTagged({
    sender: userId,
    refId: postId,
    deleteReferenceId: like._id,
    receiver: creator,
    type: 'like',
    taggedUsers: tagUsers
  });

  // CLUB NOTIFICATION SECTION
  const post = like.post as any;
  if (post.creator_type === CREATOR_TYPE.CLUB) {
    const clubId = post.club;
    const club = await Club.findById(clubId, '-_id club_notification_settings').populate('club_notification_settings').lean();
    const notificationSettings = club?.club_notification_settings as IClubNotificationSettings | undefined;
    const likes_on_your_posts_club = notificationSettings?.likes_on_your_posts;
    const shouldSendClub = likes_on_your_posts_club === CLUB_NOTIFICATION_OPTION.FROM_EVERYONE;

    if (shouldSendClub) {
      Notification.create({
        receiver: clubId,
        receiver_club: clubId,
        sender: userId,
        title: "A user liked on your club's post",
        refId: postId,
        deleteReferenceId: like._id,
        path: `/user/post/like/${like._id}`,
      });
    }
  }


  return like;
};

const deleteLike = async (postId: string, userId: string) => {
  const like = await Like.findOneAndDelete(
    { post: postId, user: userId },
    {
      new: true,
    }
  );


  if (!like) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Like not found');
  }

  Notification.deleteOne({
    deleteReferenceId: like._id,
    sender: userId,
  }).exec();

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
  return await Like.exists({ post: postId, user: userId }).lean();
};

export const LikeService = {
  createLike,
  deleteLike,
  getLikesByPost,
  hasUserLiked,
};
