import { User } from '../user/user.model';
import { Club } from '../club/club.model';
import { StatusCodes } from 'http-status-codes';
import { IBookingClass } from './bookingClass.interface';
import { BookingClass } from './bookingClass.model';
import ApiError from '../../../errors/ApiError';
import { MEMBERS_STATUS, PAYMENT_METHOD, PAYMENT_STATUS } from './booking.constant';
import { UserCredit } from '../user/credit/user.credit.model';
import { Class } from '../class/class.model';
import { generateOrderId, sendBookingConfirmEmail } from './booking.util';
import { BookingClassCardService } from './booking.stripe';
import { emailTemplate } from '../../../shared/emailTemplate';
import { emailHelper } from '../../../helpers/emailHelper';
import QueryBuilder from '../../builder/QueryBuilder';
import setCronJob from '../../../shared/setCronJob';

// Create a new booking class
const createBookingClass = async (payload: Partial<IBookingClass>, origin: string): Promise<IBookingClass | { redirectStripeUrl: string }> => {
  const { user, club, payment_method, class: classId, class_booking_ref_id } = payload;

  // ---------------------------
  // 1. Basic Entity Validation
  // ---------------------------
  const [userExists, clubExists, classExists] = await Promise.all([
    User.findById(user).lean(),
    Club.findById(club).lean(),
    Class.findById(classId, 'max_number_of_attendees date_of_class').lean(),
  ]);

  if (!userExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (!clubExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Club not found');
  }
  if (!classExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Class not found');
  }

  // ---------------------------
  // 2. Check if user is a club member
  // ---------------------------
  const isMember = clubExists.club_members.some(
    (member) => member.user_id?.toString() === user?.toString()
  );

  if (!isMember) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'User must be a member of the club to book a class'
    );
  }

  // ---------------------------
  // 3. Check existing booking
  // ---------------------------
  const isAlreadyBooked = await BookingClass.findOne({ user, club, class: classId });
  if (isAlreadyBooked) {
    throw new ApiError(StatusCodes.BAD_REQUEST, `Class already booked as ${isAlreadyBooked.attandence_status}`);
  }

  // ---------------------------
  // 4. Check class capacity
  // ---------------------------
  const maxCapacity = classExists.max_number_of_attendees;
  const totalBooked = await BookingClass.countDocuments({
    club,
    class: classId,
    attandence_status: MEMBERS_STATUS.ATTEND,
  });

  if (totalBooked >= maxCapacity) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Class is fully booked');
  }


  const orderId = await generateOrderId();
  payload.booking_id = orderId;
  payload.attandence_status = MEMBERS_STATUS.ATTEND;
  payload.class_booking_ref_id = `${classExists.date_of_class.toISOString().split('T')[0]}_${classExists._id}`
  console.log(classExists)
  // ---------------------------
  // 5. Payment method: PAY IN PERSON
  // ---------------------------
  if (payment_method === PAYMENT_METHOD.PAY_IN_PERSON) {
    const userCredit = await UserCredit.findOne({ user, clubId: club });

    if (!userCredit || userCredit.credit < 1) {
      payload.payment_status = PAYMENT_STATUS.PAY_IN_PERSON;
    }
    else {
      payload.payment_status = PAYMENT_STATUS.PAID;
      await UserCredit.updateOne(
        { user, clubId: club },
        { $inc: { credit: -1 } }
      );
    }
    const bookingClass = await BookingClass.create(payload);
    sendBookingConfirmEmail(userExists.email as string);
    return bookingClass;
  }

  // ---------------------------
  // 6. Payment method: STRIPE
  // ---------------------------
  if (payment_method === PAYMENT_METHOD.STRIPE) {
    const createOrder = await BookingClassCardService.bookClass(payload as IBookingClass, origin);
    return createOrder;
  }

  throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid or unsupported payment method');
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

// Add user to waiting list
const addToWaitingList = async (payload: Partial<IBookingClass>) => {
  const { user, club, class: classId, class_booking_ref_id } = payload;

  // ---------------------------
  // 1. Basic Entity Validation
  // ---------------------------
  const [userExists, clubExists, classExists] = await Promise.all([
    User.findById(user).lean(),
    Club.findById(club).lean(),
    Class.findById(classId, 'max_number_of_attendees date_of_class').lean(),
  ]);

  if (!userExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  if (!clubExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Club not found');
  }
  if (!classExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Class not found');
  }

  const isAlreadyWaiting = await BookingClass.findOne({ user, club, class: classId });
  if (isAlreadyWaiting) {
    throw new ApiError(StatusCodes.BAD_REQUEST, `User already in ${isAlreadyWaiting.attandence_status} list`);
  }

  // ---------------------------
  // 2. Check if user is a club member
  // ---------------------------
  const isMember = clubExists.club_members.some(
    (member) => member.user_id?.toString() === user?.toString()
  );

  if (!isMember) {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'User must be a member of the club to book a class'
    );
  }

  const totalBooked = await BookingClass.countDocuments({
    club,
    class: classId,
    attandence_status: MEMBERS_STATUS.ATTEND,
  });

  // ---------------------------
  // 3. Check class capacity
  // ---------------------------
  const maxCapacity = classExists.max_number_of_attendees;
  if (totalBooked < maxCapacity) {
    throw new ApiError(StatusCodes.BAD_REQUEST, `Class is ${maxCapacity - totalBooked} seats available. Please boook seat`);
  }

  payload.class_booking_ref_id = `${classExists.date_of_class.toISOString().split('T')[0]}_${classExists._id}`;
  const bookingId = await generateOrderId();
  payload.booking_id = bookingId;
  if (maxCapacity - totalBooked === 0) {
    const createWatingList = await BookingClass.create({
      ...payload,
      attandence_status: MEMBERS_STATUS.WAIT,
    });

    if (createWatingList) {
      const welcomeEmailTemplate = emailTemplate.WelcomeMessageForWaitingList(userExists.email as string);
      emailHelper.sendEmail(welcomeEmailTemplate);
    }

    return createWatingList;
  }

};


const getAllBookingAttendance = async (userId: string, clubId: string, classId: string, classStartDate: Date, query: Record<string, any>) => {

  const classStartTime = new Date(classStartDate).toISOString().split('T')[0];

  const [clubExists, classExists] = await Promise.all([
    await Club.findById(clubId).lean(),
    await Class.findById(classId).lean(),
  ])

  if (!clubExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Club not found');
  }
  if (!classExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Class not found');
  }

  const result = new QueryBuilder(
    BookingClass.find({
      club: clubId,
      class: classId,
      class_booking_ref_id: `${classStartTime}_${classId}`,
    }),
    query
  ).paginate()
    .fields()
    .filter()
    .sort();

  const bookingAttendance = await result.modelQuery;
  const pagination = await result.getPaginationInfo();

  // Add setField to indicate if the requesting user is in the booking list 
  const attancence = {
    attend: 0,
    wait: 0,
    cancel: 0,
  }
  const dataWithOwnership = bookingAttendance.map((booking) => {
    const isOwn = booking.user.toString() === userId;

    if (booking.attandence_status === MEMBERS_STATUS.ATTEND) {
      attancence.attend++;
    } else if (booking.attandence_status === MEMBERS_STATUS.WAIT) {
      attancence.wait++;
    } else if (booking.attandence_status === MEMBERS_STATUS.CANCEL) {
      attancence.cancel++;
    }

    return {
      //@ts-ignore
      ...booking.toObject(),
      isOwn
    };
  });

  return {
    pagination,
    attancence,
    result: dataWithOwnership,
  };
};


const cancelAttendence = async (userId: string, classBookingRefId: string) => {

  const booking = await BookingClass.findOneAndUpdate({
    user: userId,
    class_booking_ref_id: classBookingRefId,
    attandence_status: MEMBERS_STATUS.ATTEND,
  }, {
    attandence_status: MEMBERS_STATUS.CANCEL,
  });

  const userExists = await User.findById(userId).lean();
  if (!userExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (!booking) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');
  }
  if (booking.attandence_status === MEMBERS_STATUS.CANCEL) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Booking already cancelled');
  }

  if (booking.attandence_status === MEMBERS_STATUS.ATTEND && booking.payment_method === PAYMENT_METHOD.STRIPE && booking.payment_status === PAYMENT_STATUS.PAID) {
    const existingCredit = await UserCredit.findOne({ user: userId, club: booking.club });
    if (existingCredit) {
      await UserCredit.updateOne(
        { user: userId, club: booking.club },
        { $inc: { credit: 1 } }
      );
    } else {
      await UserCredit.create({ user: userId, club: booking.club, credit: 1 });
    }
  }

  if (booking) {
    const welcomeEmailTemplate = emailTemplate.WelcomeMessageForCancellation(userExists.email as string);
    emailHelper.sendEmail(welcomeEmailTemplate);
  }

  setCronJob('*/30 * * * *', () => {
    if (1) {
      const welcomeEmailTemplate = emailTemplate.completeAccount(userExists?.email as string);
      emailHelper.sendEmail(welcomeEmailTemplate);
    }
  });

  return booking;
};

export const BookingClassService = {
  createBookingClass,
  getBookingClassesByClubId,
  addToWaitingList,
  getAllBookingAttendance,
  cancelAttendence
};