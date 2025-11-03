import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import unlinkFile from '../../../shared/unlinkFile';
import { IUser, IUserProfile } from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import { emailTemplate } from '../../../shared/emailTemplate';
import setCronJob from '../../../shared/setCronJob';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { getAppleUserInfoWithToken, getUserInfoWithToken } from './user.util';

const createUserToDB = async (payload: Partial<IUser>): Promise<IUser | { accessToken: string }> => {
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
    isValid = true;
    const tokenData = await getUserInfoWithToken(payload?.google_id_token);
    payload.email = tokenData?.data?.email;
    payload.verified = true;
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

  if (!createUser || !isValid) throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');

  if (isValid && createUser && payload.auth_provider === 'local') {
    const createAccountTemplate = emailTemplate.createAccount({
      email: createUser.email,
      verify_url: `${config.front_end_app_url}?token=${payload.token}`,
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

const getUserProfileFromDB = async (
  user: JwtPayload
): Promise<any> => {
  const { id } = user;
  // Only unselect the arrays but still need to count their lengths, so will fetch their counts
  const isExistUser = await User.findById(id).lean();
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  // Prepare response without full followers/following arrays, only counts
  const userProfile = {
    ...isExistUser,
    profile: {
      ...isExistUser.profile,
      totalFollower: isExistUser.profile?.followers ? isExistUser.profile.followers.length : 0,
      totalFollowing: isExistUser.profile?.following ? isExistUser.profile.following.length : 0,
    },

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
  if (payload.image) {
    unlinkFile(payload.image as string);
  }
  if (payload.cover_image) {
    unlinkFile(payload.cover_image as string);
  }
  if (!!payload.year_of_exprience) {
    payload.year_of_exprience = Number(payload.year_of_exprience) as any;
  }

  console.log(payload);

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
        isExistUser?.email as string
      );
      emailHelper.sendEmail(welcomeEmailTemplate);
    }
  });

  return isExistUser;
};



export const followUser = async (userId: string, targetId: string) => {
  if (userId === targetId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "You cannot follow yourself");
  }

  await User.findByIdAndUpdate(userId, {
    $addToSet: { "profile.following": targetId }
  });

  await User.findByIdAndUpdate(targetId, {
    $addToSet: { "profile.followers": userId }
  });

};


export const unfollowUser = async (userId: string, targetId: string) => {

  if (userId === targetId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "You cannot unfollow yourself");
  }

  await User.findByIdAndUpdate(userId, {
    $pull: { "profile.following": targetId }
  });

  await User.findByIdAndUpdate(targetId, {
    $pull: { "profile.followers": userId }
  });

};



export const getUserStats = async (userId: string, targetId: string) => {
  const user = await User.findById(targetId).lean();
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  return {
    followers: user.profile?.followers?.length,
    following: user.profile?.following?.length
  };
};
// const isFollowing = user.following.includes(targetUserId);

export const UserService = {
  createUserToDB,
  getUserProfileFromDB,
  updateProfileToDB,
  updateSkypeProfileToDB,
  followUser,
  unfollowUser,
  getUserStats
};
