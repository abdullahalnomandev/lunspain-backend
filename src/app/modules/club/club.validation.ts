import { z } from 'zod';
import { CLUB_ROLE } from './club.constant';

// Validation for a single club member
const clubMemberSchema = z.object({
  user_Id: z.string({ required_error: 'Member user ID is required' }),
  role: z.nativeEnum(CLUB_ROLE).optional().default(CLUB_ROLE.USER),
});

// Schema for creating a club
const createClubZodSchema = z.object({
  name: z.string({ required_error: 'Club name is required' }),
  description: z.string().optional(),
  website: z.string().url('Website must be a valid URL').optional(),
  address: z.string().optional(),
  club_creator: z.string({ required_error: 'Club creator is required' }),
  stablished_date: z.string().datetime().optional(),
  country: z.string().optional(),
  post_code: z.string().optional(),
  club_specilaity: z.array(z.string()).optional(),
  club_members: z.array(clubMemberSchema).optional(),
  club_logo: z.string().url('Club logo must be a valid URL').optional(),
  club_image: z.string().url('Club image must be a valid URL').optional(),
});

// Schema for updating a club
const updateClubZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url('Website must be a valid URL').optional(),
  address: z.string().optional(),
  stablished_date: z.string().datetime().optional(),
  country: z.string().optional(),
  post_code: z.string().optional(),
  club_specilaity: z.array(z.string()).optional(),
  club_members: z.array(clubMemberSchema).optional(),
  club_logo: z.string().url('Club logo must be a valid URL').optional(),
  club_image: z.string().url('Club image must be a valid URL').optional(),
});

export const ClubValidation = {
  createClubZodSchema,
  updateClubZodSchema,
};