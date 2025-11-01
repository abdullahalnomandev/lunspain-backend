import { z } from 'zod';

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  date_of_birth: z.string().optional(),
  country: z.string().optional(),
  skills: z.array(z.string()).optional(),
  year_of_exprience: z.string().optional(),
  lavel_of_exprience: z.string().optional(),
  image: z.string().optional(),
  cover_image: z.string().optional(),
  username: z.string().optional(),
});

const createUserZodSchema = z.object({
  body: z.object({
    profile: profileSchema.optional(),
    role: z.string().optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format').optional(),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters').optional(),
    status: z.enum(['active', 'delete']).optional(),
    verified: z.boolean().optional(),
    token: z.string().optional(),
  }),
});

const updateUserZodSchema = z.object({
  profile: profileSchema.optional(),
  role: z.string().optional(),
  email: z.string().email('Invalid email format').optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  status: z.enum(['active', 'delete']).optional(),
  verified: z.boolean().optional(),
  token: z.string().optional(),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
