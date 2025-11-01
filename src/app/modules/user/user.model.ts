import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import config from '../../../config';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { IUser, UserModel } from './user.interface';

const profile = {
  firstName: {
    type: String,
    trim: true,
  },
  username:{
    type:String,
    trim:true
  },
  lastName: {
    type: String,
    trim: true,
  },
  date_of_birth: {
    type: String,
  },
  country: {
    type: String,
  },
  skills: {
    type: [String]
  },
  year_of_exprience: {
    type: Number,
  },
  lavel_of_exprience: {
    type: String,
  },
  image: {
    type: String,
    default: 'https://i.ibb.co/z5YHLV9/profile.png',
  },
  cover_image: {
    type: String,
  },
};

const userSchema = new Schema<IUser, UserModel>(
  {
    profile,
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
      minlength: 8,
      validate: {
        validator: function (v: string) {
          return /[a-z]/.test(v) && /[A-Z]/.test(v) && /\d/.test(v);
        },
        message: 'Password must include both lowercase and uppercase letters and at least one number',
      },
    },
    google_id_token: {
      type: String,
      select: false,
    },
    apple_id_token: {
      type: String,
      select: false,
    },
    auth_provider: {
      type: String,
      enum: ['local', 'google', 'apple'],
      default: 'local',
      select: false,
    },
    status: {
      type: String,
      enum: ['active', 'delete'],
      default: 'active',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

/* ---------- Static Methods ---------- */

// Check if user exists by ID
userSchema.statics.isExistUserById = async (id: string) => {
  return await User.findById(id);
};

// Check if user exists by email
userSchema.statics.isExistUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

// Compare passwords
userSchema.statics.isMatchPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

/* ---------- Middleware ---------- */

userSchema.pre('save', async function (next) {
  // Check for existing user
  const isExist = await User.findOne({ email: this.email });
  if (isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Account already exists!');
  }

  // Hash password
  this.profile.username = this.profile?.username || this.email.split('@')[0];
  if(!this.password) return next();
  this.password = await bcrypt.hash(this.password,Number(config.bcrypt_salt_rounds));

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
