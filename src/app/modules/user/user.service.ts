import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import setCronJob from '../../../shared/setCronJob';
import unlinkFile from '../../../shared/unlinkFile';
import QueryBuilder from '../../builder/QueryBuilder';
import { Comment } from '../post/comment/comment.model';
import { Like } from '../post/like';
import { Post } from '../post/post.model';
import { Follower } from './follower/follower.model';
import { userSearchableField } from './user.constant';
import { IUser, IUserProfile } from './user.interface';
import { User } from './user.model';
import { getAppleUserInfoWithToken, getUserInfoWithToken } from './user.util';
import { ClubMember } from '../club/club_members/club_members.model';
import { IUserNotificationSettings } from './notificaiton_settings/notifation_sttings.interface';
import { UserNotificationSettings } from './notificaiton_settings/notification_settings.model';
import { sendNotification } from '../../../shared/sendNotification';
import { NOTIFICATION_OPTION } from './notificaiton_settings/notification_settings.constant';
import { Notification } from '../notification/notification.mode';
import { CloseAccountRequest } from './privacy/close_account_request.model';
import { CLOSING_STATUS } from './privacy/close_account_request.interface';
import { CLUB_ROLE } from '../club/club.constant';
import { Conversation } from '../conversation/conversaiton.model';

const createUserToDB = async (
  payload: Partial<IUser>
): Promise<IUser | { accessToken: string }> => {
  if (
    !payload.password &&
    !payload.google_id_token &&
    !payload.apple_id_token
  ) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Passwored or Google or Apple id is required'
    );
  }

  let isValid = false;

  //GOOGLE
  if (payload.auth_provider === 'google' && payload.google_id_token) {
    const tokenData = await getUserInfoWithToken(payload?.google_id_token);
    payload.email = tokenData?.data?.email;
    payload.email = tokenData?.data?.email;

    const fullName = tokenData?.data?.name?.trim() || '';
    const [firstName, ...rest] = fullName.split(/\s+/);

    (payload as any).profile = {
      ...payload.profile,
      firstName: firstName || '',
      lastName: rest.join(' ') || '',
    };

    isValid = true;
    if (tokenData) payload.verified = true;

    const isExist = await User.exists({ email: tokenData?.data?.email }).lean();

    if (isExist) {
      const createToken = jwtHelper.createToken(
        { id: isExist._id, role: isExist.role, email: isExist.email },
        config.jwt.jwt_secret as Secret,
        config.jwt.jwt_expire_in as string
      );
      return { accessToken: createToken };
    }
  }
  // APPLE
  else if (payload.auth_provider === 'apple' && payload.apple_id_token) {
    isValid = true;
    // will letter add apple id token validation
    const tokenData = await getAppleUserInfoWithToken(payload?.apple_id_token);
    payload.email = tokenData?.data?.email;
    payload.verified = true;
  }
  //LOCAL
  else {
    if (payload.auth_provider === 'local' && payload.password) {
      isValid = true;
      payload.token = crypto.randomUUID();
    }
  }
  const createUser = await User.create(payload);

  if (!createUser || !isValid)
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');

  if (isValid && createUser && payload.auth_provider === 'local') {
    const createAccountTemplate = emailTemplate.createAccount({
      email: createUser.email,
      // verify_url: `${config.front_end_app_url}/verify?token=${payload.token}`,
      verify_url: `${config.front_end_app_url}?screen=confirm-email&token=${payload.token}`,
    });
    emailHelper.sendEmail(createAccountTemplate);
    return createUser;
  } else {
    //create token
    const createToken = jwtHelper.createToken(
      { id: createUser._id, role: createUser.role, email: createUser.email },
      config.jwt.jwt_secret as Secret,
      config.jwt.jwt_expire_in as string
    );
    return { accessToken: createToken };
  }
};

const getUserProfileFromDB = async (user: JwtPayload): Promise<any> => {
  const { id } = user;

  // Only unselect the arrays but still need to count their lengths, so will fetch their counts
  const isExistUser = await User.findById(id, '-verified -token').lean();
  const userPosts = await Post.find({ creator: id }, '-creator -likes').lean();
  const totalFollower = await Follower.countDocuments({ following: id }).lean();
  const totalFollowing = await Follower.countDocuments({ follower: id }).lean();

  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  const postsWithCounts = await Promise.all(
    userPosts.map(async (post: any) => {
      const [commentOfPost, likeOfPost] = await Promise.all([
        Comment.countDocuments({ post: post._id }).lean(),
        Like.countDocuments({ post: post._id }).lean(),
      ]);
      return {
        ...post,
        commentOfPost,
        likeOfPost,
      };
    })
  );
  const userClubs = await ClubMember.find({ user: id }).populate('club').lean();

  // Prepare response without full followers/following arrays, only counts
  const userProfile = {
    ...isExistUser,
    profile: {
      ...isExistUser.profile,
      totalFollower: totalFollower,
      totalFollowing: totalFollowing,
    },
    posts: postsWithCounts,
    clubs: userClubs,
  };

  // Remove the actual lists from the response
  if (userProfile.profile) {
    delete userProfile.profile.followers;
    delete userProfile.profile.following;
  }

  return userProfile;
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUserProfile>
): Promise<Partial<IUser | null> | undefined> => {
  const { id } = user;

  const isExistUser = (await User.isExistUserById(id)) as IUser;
  const {
    firstName,
    lastName,
    date_of_birth,
    country,
    year_of_exprience,
    level_of_experience,
  } = isExistUser.profile;

  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //unlink file here
  if (payload.image && payload.image === isExistUser.profile?.image) {
    unlinkFile(payload.image as string);
  }
  if (
    payload.cover_image &&
    payload.cover_image === isExistUser.profile?.cover_image
  ) {
    unlinkFile(payload.cover_image as string);
  }
  if (!!payload.year_of_exprience) {
    payload.year_of_exprience = Number(payload.year_of_exprience) as any;
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: { profile: { ...isExistUser.profile, ...payload } } },
    {
      new: true,
    }
  );

  // Welcome Email
  if (
    updatedUser &&
    !firstName &&
    !lastName &&
    !date_of_birth &&
    !country &&
    !year_of_exprience &&
    !level_of_experience
  ) {
    const welcomeEmailTemplate = emailTemplate.updateCompletedWelcomeEmail(
      updatedUser?.email as string
    );
    emailHelper.sendEmail(welcomeEmailTemplate);
  }

  return updatedUser;
};

const updateSkypeProfileToDB = async (
  user: JwtPayload
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = (await User.isExistUserById(id)) as IUser;

  setCronJob('0 */4 * * *', () => {
    if (
      !isExistUser?.profile?.firstName &&
      !isExistUser?.profile?.lastName &&
      !isExistUser?.profile?.date_of_birth &&
      !isExistUser?.profile?.country
    ) {
      const welcomeEmailTemplate = emailTemplate.completeAccount(
        isExistUser?.email as string,
        `${config.front_end_app_url}?userId=${isExistUser?._id}`
      );
      emailHelper.sendEmail(welcomeEmailTemplate);
    }
  });

  return isExistUser;
};

const getAllUsers = async (query: Record<string, any>) => {
  const club_id = query.club_id;

  // Build base query
  let baseQuery = User.find();

  // If club_id exists, filter users who are members of the club
  if (club_id) {
    const clubMemberDocs = await ClubMember.find({ club: club_id }).lean();
    const memberUserIds = clubMemberDocs.map(doc => doc.user);
    baseQuery = User.find({ _id: { $in: memberUserIds } });
  }

  const userQuery = new QueryBuilder(baseQuery, query)
    .paginate()
    .search(userSearchableField)
    .fields()
    .filter(['club_id'])
    .sort();

  const result = await userQuery.modelQuery.lean();
  const pagination = await userQuery.getPaginationInfo();

  return {
    pagination,
    data: result,
  };
};
// .populate({
//   path: "airlineVerification",
//   match: { paymentStatus: "paid" },
//   select: "designation plan employeeId images paymentStatus paymentMethod",
//   populate: {
//     path: "plan",
//     select: "-active",
//   },
// })
export const toggleFollowUser = async (
  userId: string,
  targetId: string,
  fcmToken: string
) => {
  if (userId === targetId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'You cannot follow yourself');
  }

  const isFollowing = await Follower.findOne({
    follower: userId,
    following: targetId,
  });

  if (isFollowing) {
    await Follower.findByIdAndDelete(isFollowing._id);
    Notification.deleteOne({
      deleteReferenceId: isFollowing._id,
      sender: userId,
    }).exec();
    return {
      message: 'Unfollowed successfully',
    };
  } else {
    const follow = await Follower.create({
      follower: userId,
      following: targetId,
    });

    //  SEND NOTIFICATION
    const userNotificationSettings = await User.findById(
      targetId,
      '-_id notification_settings'
    )
      .populate('notification_settings')
      .lean()
      .exec();

    const { new_followers } =
      userNotificationSettings?.notification_settings as IUserNotificationSettings;
    sendNotification(new_followers, {
      receiver: targetId,
      sender: userId,
      title: 'A user has followed you',
      refId: userId,
      deleteReferenceId: follow._id,
      path: '/follow/user',
      fcmToken,
    });

    // SEND NOTIFICATION END

    return {
      message: 'Followed successfully',
      data: follow,
    };
  }
};

export const unfollowUser = async (userId: string, targetId: string) => {
  if (userId === targetId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'You cannot unfollow yourself');
  }

  await User.findByIdAndUpdate(userId, {
    $pull: { 'profile.following': targetId },
  });

  await User.findByIdAndUpdate(targetId, {
    $pull: { 'profile.followers': userId },
  });
};

export const getUserStats = async (userId: string, targetId: string) => {
  const user = await User.findById(targetId).lean();
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return {
    followers: user.profile?.followers?.length,
    following: user.profile?.following?.length,
  };
};
// const isFollowing = user.following.includes(targetUserId);

const getUserProfileByIdFromDB = async (
  userId: string,
  requestUserId: string
): Promise<IUser & { isFollowing: boolean }> => {
  // Only unselect the arrays but still need to count their lengths, so will fetch their counts
  const isExistUser = await User.findById(
    requestUserId,
    '-verified -role -token'
  ).lean();
  const userPosts = await Post.find(
    { creator: requestUserId },
    '-creator -likes'
  ).lean();
  const totalFollower = await Follower.countDocuments({
    following: requestUserId,
  }).lean();
  const totalFollowing = await Follower.countDocuments({
    follower: requestUserId,
  }).lean();

  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  const userClubs = await ClubMember.find({ user: requestUserId }).populate('club').lean();

  const postsWithCounts = await Promise.all(
    userPosts.map(async (post: any) => {
      const [commentOfPost, likeOfPost] = await Promise.all([
        Comment.countDocuments({ post: post._id }).lean(),
        Like.countDocuments({ post: post._id }).lean(),
      ]);
      return {
        ...post,
        commentOfPost,
        likeOfPost,
      };
    })
  );

  // Determine if a conversation exists between userId and requestUserId
  const conversationId = await Conversation.findOne({
    $or: [
      { creator: userId, participant: requestUserId },
      { creator: requestUserId, participant: userId },
    ],
  }).lean();
  
  // Check if requestUserId follows userId
  const isFollowing = !!(await Follower.findOne({
    follower: userId,
    following: requestUserId,
  }).lean());

  // Prepare response without full followers/following arrays, only counts
  const userProfile = {
    ...isExistUser,
    profile: {
      ...isExistUser.profile,
      totalFollower: totalFollower,
      totalFollowing: totalFollowing,
    },
    posts: postsWithCounts,
    clubs: userClubs,
    isFollowing,
    conversationId
  };

  // Remove the actual lists from the response
  if (userProfile.profile) {
    delete userProfile.profile.followers;
    delete userProfile.profile.following;
  }

  return userProfile;
};

const getFollowingListFromDB = async (
  requestUserId: string,
  myUserId: string,
  query: Record<string, any>
) => {
  // Build query for users that requestUserId is following
  const followingQuery = new QueryBuilder(
    Follower.find({ follower: requestUserId }).populate(
      'following',
      'profile.firstName profile.username profile.lastName profile.image'
    ),
    query
  )
    .paginate()
    .fields()
    .filter()
    .sort();

  const result = await followingQuery.modelQuery;
  const pagination = await followingQuery.getPaginationInfo();

  // For each followed user, determine if myUserId also follows them
  const enriched = await Promise.all(
    result.map(async (doc: any) => {
      const targetUserId = doc.following._id;
      const amIFollowing = !!(await Follower.exists({
        follower: myUserId,
        following: targetUserId,
      }).lean());
      return {
        ...doc.toObject(),
        isFollowing: amIFollowing,
      };
    })
  );

  return {
    data: enriched,
    pagination,
  };
};

const getFollowerListFromDB = async (
  requestUserId: string,
  myUserId: string,
  query: Record<string, any>
) => {
  // Build query for users that requestUserId is following
  const followingQuery = new QueryBuilder(
    Follower.find({ following: requestUserId }).populate(
      'follower',

      'profile.firstName profile.username profile.lastName profile.image'
    ),
    query
  )
    .paginate()
    .fields()
    .filter()
    .sort();

  const result = await followingQuery.modelQuery;
  const pagination = await followingQuery.getPaginationInfo();

  // For each followed user, determine if myUserId also follows them
  const enriched = await Promise.all(
    result.map(async (doc: any) => {
      const targetUserId = doc.following._id;
      const amIFollowing = !!(await Follower.exists({
        follower: myUserId,
        following: targetUserId,
      }).lean());
      return {
        ...doc.toObject(),
        isFollowing: amIFollowing,
      };
    })
  );

  return {
    data: enriched,
    pagination,
  };
};

const getAllNotificationSettingsFromDB = async (user: string) => {
  const notificationSettings = await User.findById(
    user,
    '-_id notification_settings'
  )
    .populate('notification_settings')
    .lean();

  return notificationSettings?.notification_settings;
};

const updateNotificationSettingsFromDB = async (
  user: string,
  notificationSettings: IUserNotificationSettings
) => {
  const userExist = await User.findById(user, 'notification_settings').lean();
  if (!userExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return await UserNotificationSettings.findOneAndUpdate(
    { _id: userExist.notification_settings },
    { $set: notificationSettings },
    { new: true }
  );
};

const createCloseAccountRequest = async (
  userId: string,
  marketing_permission: boolean,
  feedback: string
) => {
  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User doesn't exist");
  }

  const existingRequest = await CloseAccountRequest.findOne({
    account: userId,
    requested_user: userId,
  });

  if (existingRequest) {
    await CloseAccountRequest.deleteOne({ _id: existingRequest._id });
    return { message: 'Close Account request removed' };
  }

  const closeAccountRequest = await CloseAccountRequest.create({
    account: userId,
    requested_user: userId,
    marketing_permission,
    feedback,
  });

  const requestEmail = emailTemplate.RequestToCloseClub(user?.email || '');
  emailHelper.sendEmail(requestEmail);

  // SET SCHEDULE TRIGGER TO DELETE USER ACCOUNT AFTER 48 HOURS IF NO MARKETING PERMISSION
  setCronJob('0 0 */2 * *', async () => {
    const existRequest = await CloseAccountRequest.findOne({
      account: userId,
      requested_user: userId,
    });

    if (
      existRequest &&
      existRequest.closing_status === CLOSING_STATUS.PENDING
    ) {
      if (existRequest.marketing_permission) {
        // Optionally handle marketing permission logic for user here if needed
      } else {
        await User.findByIdAndDelete(userId);
        // Optionally delete related references if necessary
      }

      await CloseAccountRequest.updateOne(
        { _id: existRequest._id },
        { closing_status: CLOSING_STATUS.CLOSED }
      );

      const closeEmail = emailTemplate.AccountClosedNotificaiton(
        user?.email || ''
      );
      emailHelper.sendEmail(closeEmail);
    }
  });

  return closeAccountRequest;
};

const getAccountCloseStatus = async (userId: string) => {
  const closeRequest = await CloseAccountRequest.findOne({
    account: userId,
    requested_user: userId,
  });

  return {
    message: !!closeRequest
      ? 'Close request already exists'
      : 'No close request found',
    isRequestedToClose: !!closeRequest,
  };
};

export const UserService = {
  createUserToDB,
  getUserProfileFromDB,
  updateProfileToDB,
  updateSkypeProfileToDB,
  toggleFollowUser,
  unfollowUser,
  getUserStats,
  getAllUsers,
  getUserProfileByIdFromDB,
  getFollowerListFromDB,
  getFollowingListFromDB,
  getAllNotificationSettingsFromDB,
  updateNotificationSettingsFromDB,
  createCloseAccountRequest,
  getAccountCloseStatus,
};
