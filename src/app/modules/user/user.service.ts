import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import unlinkFile from '../../../shared/unlinkFile';
import generateOTP from '../../../util/generateOTP';
import { IUser, IUserProfile } from './user.interface';
import { User } from './user.model';
import { ObjectId } from 'mongoose';
import config from '../../../config';
import { emailTemplate } from '../../../shared/emailTemplate';
import cron from 'node-cron';
import setCronJob from '../../../shared/setCronJob';

const createUserToDB = async (payload: Partial<IUser>): Promise<IUser> => {

  if (!payload.password && !payload.google_id_token && !payload.apple_id_token) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Passwored or Google or Apple id is required');
  }

  let isValid = false;

  if (payload.auth_provider === 'google' && payload.google_id_token) {
    isValid = true
    const data = fetch(`https://www.googleapis.com/plus/v1/people/me?access_token=${payload.google_id_token}`).then((res) => res.json()).then((data) => {

      console.log(data)
    })
  } else if (payload.auth_provider === 'apple' && payload.apple_id_token) {
    isValid = true

    // will letter 
  } else {
    if (payload.auth_provider === 'local' && payload.password) {
      isValid = true
      payload.token = crypto.randomUUID();
    }

  }


  const createUser = await User.create(payload);

  if (!createUser || !isValid) throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
  else {

    const createAccountTemplate = emailTemplate.createAccount({ email: createUser.email, verify_url: `${config.front_end_app_url}?token=${payload.token}` });
    emailHelper.sendEmail(createAccountTemplate);
    return createUser;

  }


};

// const createUserToDB = async (payload: Partial<IUser>): Promise<IUser> => {
//   //set role
//   payload.role = USER_ROLES.USER;
//   const createUser = await User.create(payload);
//   if (!createUser) {
//     throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
//   }

//   //send email
//   const otp = generateOTP();
//   const values = {
//     name: createUser.name,
//     otp: otp,
//     email: createUser.email!,
//   };
//   const createAccountTemplate = emailTemplate.createAccount(values);
//   emailHelper.sendEmail(createAccountTemplate);

//   //save to DB
//   const authentication = {
//     oneTimeCode: otp,
//     expireAt: new Date(Date.now() + 3 * 60000),
//   };
//   await User.findOneAndUpdate(
//     { _id: createUser._id },
//     { $set: { authentication } }
//   );

//   return createUser;
// };

const getUserProfileFromDB = async (
  user: JwtPayload
): Promise<Partial<IUser>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return isExistUser;
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUserProfile>
): Promise<Partial<IUser | null> | undefined> => {

  const { id } = user;

  const isExistUser = await User.isExistUserById(id) as IUser;
  const { firstName, lastName, date_of_birth, country, year_of_exprience, level_of_experience, image, cover_image } = isExistUser.profile;


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
  console.log(payload.year_of_exprience)
  if (!!payload.year_of_exprience) {
    payload.year_of_exprience = Number(payload.year_of_exprience) as any;
  }

  console.log(payload);

  const updatedUser = await User.findByIdAndUpdate(id, { $set: { 'profile': { ...isExistUser.profile, ...payload } } }, {
    new: true,
  });


  // Welcome Email
  if (updatedUser && !firstName && !lastName && !date_of_birth && !country && !year_of_exprience && !level_of_experience) {
    const welcomeEmailTemplate = emailTemplate.updateCompletedWelcomeEmail(updatedUser?.email as string);
    emailHelper.sendEmail(welcomeEmailTemplate);
  }

  return updatedUser;
};

const updateSkypeProfileToDB = async (
  user: JwtPayload
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id) as IUser;

  setCronJob('0 */4 * * *',
    () => {
      if (!isExistUser?.profile?.firstName && !isExistUser?.profile?.lastName && !isExistUser?.profile?.date_of_birth && !isExistUser?.profile?.country) {
        const welcomeEmailTemplate = emailTemplate.completeAccount(isExistUser?.email as string);
        emailHelper.sendEmail(welcomeEmailTemplate);
      }

    })

  return isExistUser;
};


export const UserService = {
  createUserToDB,
  getUserProfileFromDB,
  updateProfileToDB,
  updateSkypeProfileToDB,
};
