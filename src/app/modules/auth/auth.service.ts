import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import {
  IAuthResetPassword,
  IChangePassword,
  ILoginData,
  IVerifyEmail,
} from '../../../types/auth';
import cryptoToken from '../../../util/cryptoToken';
import generateOTP from '../../../util/generateOTP';
import { User } from '../user/user.model';
import { USER_AUTH_PROVIDER } from '../user/user.constant';

//login
const loginUserFromDB = async (payload: ILoginData) => {
  const { email, password, google_id_token, apple_id_token } = payload;

  let userInfo = null;

  //GOOGLE LOGIN
  if (payload.auth_provider === USER_AUTH_PROVIDER.GOOGLE && google_id_token) {
    userInfo = await User.findOne({ email }).select('+password');

    if (userInfo && await User.isMatchPassword(password, userInfo.password)) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Password is incorrect!');
    }

  }
  //APPLE LOGIN

  else if (payload.auth_provider === USER_AUTH_PROVIDER.APPLE && apple_id_token) {

  } else {
    // LOCAL LOGIN
    if (payload.auth_provider === USER_AUTH_PROVIDER.LOCAL && password) {
      userInfo = await User.findOne({ email }).select('+password');

      console.log(userInfo)

      if (userInfo && !(await User.isMatchPassword(password, userInfo.password))) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Password is incorrect!');
      }

    }
  }

  if (!userInfo) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //check verified and status
  if (!userInfo.verified) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Please verify your account, then try to login again'
    );
  }

  //check user status
  if (userInfo.status === 'delete') {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You don’t have permission to access this content.It looks like your account has been deleted.'
    );
  }



  //create token
  const createToken = jwtHelper.createToken(
    { id: userInfo._id, role: userInfo.role, email: userInfo.email },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expire_in as string
  );

  return { data: { accessToken: createToken } };
};

//forget password
const forgetPasswordToDB = async (email: string) => {
  const isExistUser = await User.isExistUserByEmail(email);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //send mail
  const otp = generateOTP();
  const value = {
    otp,
    email: isExistUser.email,
  };
  const forgetPassword = emailTemplate.resetPassword(value);
  emailHelper.sendEmail(forgetPassword);

  //save to DB
  const authentication = {
    oneTimeCode: otp,
    expireAt: new Date(Date.now() + 3 * 60000),
  };
  await User.findOneAndUpdate({ email }, { $set: { authentication } });
};

//verify email
const verifyEmailToDB = async (verify_token: string) => {
  const isExistUser = await User.findOne({ token: verify_token });

  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Token is not valid!");
  }

  await User.findOneAndUpdate({ token: verify_token }, {
    token: null,
    verified: true
  })


  //create token
  const createToken = jwtHelper.createToken(
    { id: isExistUser._id, role: isExistUser.role, email: isExistUser.email },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expire_in as string
  );


  return { data: { accessToken: createToken }, message: "Account successfullay verified." };
};

//forget password
const resetPasswordToDB = async (
  token: string,
  payload: IAuthResetPassword
) => {
  const { newPassword, confirmPassword } = payload;
  //isExist token
  const isExistToken = await ResetToken.isExistToken(token);
  if (!isExistToken) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
  }

  //user permission check
  const isExistUser = await User.findById(isExistToken.user).select(
    '+authentication'
  );
  if (!isExistUser?.authentication?.isResetPassword) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "You don't have permission to change the password. Please click again to 'Forgot Password'"
    );
  }

  //validity check
  const isValid = await ResetToken.isExpireToken(token);
  if (!isValid) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Token expired, Please click again to the forget password'
    );
  }

  //check password
  if (newPassword !== confirmPassword) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "New password and Confirm password doesn't match!"
    );
  }

  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const updateData = {
    password: hashPassword,
    authentication: {
      isResetPassword: false,
    },
  };

  await User.findOneAndUpdate({ _id: isExistToken.user }, updateData, {
    new: true,
  });
};

const changePasswordToDB = async (
  user: JwtPayload,
  payload: IChangePassword
) => {
  const { currentPassword, newPassword, confirmPassword } = payload;
  const isExistUser = await User.findById(user.id).select('+password');
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  //current password match
  if (
    currentPassword &&
    !(await User.isMatchPassword(currentPassword, isExistUser.password))
  ) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Password is incorrect');
  }

  //newPassword and current password
  if (currentPassword === newPassword) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Please give different password from current password'
    );
  }
  //new password and confirm password check
  if (newPassword !== confirmPassword) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Password and Confirm password doesn't matched"
    );
  }

  //hash password
  const hashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const updateData = {
    password: hashPassword,
  };
  await User.findOneAndUpdate({ _id: user.id }, updateData, { new: true });
};

const resendEmailToDB = async (email: string) => {
  const isExistUser = await User.isExistUserByEmail(email);
  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }
  if (isExistUser.verified) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User is already verified! Please login to your account.");
  }

  const createAccountTemplate = emailTemplate.createAccount({ email: isExistUser.email, verify_url: `${config.front_end_app_url}?token=${crypto.randomUUID()}` });
  emailHelper.sendEmail(createAccountTemplate);
};

export const AuthService = {
  resendEmailToDB,
  verifyEmailToDB,
  loginUserFromDB,
  forgetPasswordToDB,
  resetPasswordToDB,
  changePasswordToDB,
};
