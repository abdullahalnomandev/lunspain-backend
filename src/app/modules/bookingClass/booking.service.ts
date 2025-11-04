import { User } from '../user/user.model';
import { Club } from '../club/club.model';
import { StatusCodes } from 'http-status-codes';
import { IBookingClass } from './bookingClass.interface';
import { BookingClass } from './bookingClass.model';
import ApiError from '../../../errors/ApiError';

// Create a new booking class
const createBookingClass = async (payload: Partial<IBookingClass>) => {
  const { user, club } = payload;

  console.log(payload)

  // Validate user exists
//   const userExists = await User.findById(user);
//   if (!userExists) {
//     throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
//   }

//   // Validate club exists
//   const clubExists = await Club.findById(club);
//   if (!clubExists) {
//     throw new ApiError(StatusCodes.NOT_FOUND, 'Club not found');
//   }

//   // Ensure user is a member of the club
//   const isMember = clubExists.club_members.some(
//     (member) => member.user_id?.toString() === user?.toString()
//   );
//   if (!isMember) {
//     throw new ApiError(
//       StatusCodes.FORBIDDEN,
//       'User must be a member of the club to book a class'
//     );
//   }

//   const newBookingClass = await BookingClass.create(payload);
//   return newBookingClass;
};

// Get all booking classes for a specific club
const getBookingClassesByClubId = async (clubId: string, userId: string) => {
  // Validate club exists
  const club = await Club.findById(clubId);
  if (!club) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Club not found');
  }

  // Ensure requesting user is a member of the club
  const isMember = club.club_members.some(
    (member) => member.user_id.toString() === userId
  );
  if (!isMember) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'User must be a member of the club to view booking classes'
    );
  }

  const bookingClasses = await BookingClass.find({ club: clubId })
    .populate('user', 'name email')
    .populate('club', 'name')
    .lean();

  return bookingClasses;
};

export const BookingClassService = {
  createBookingClass,
  getBookingClassesByClubId,
};