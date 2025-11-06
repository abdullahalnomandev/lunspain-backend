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
import cron from 'node-cron';
import { IClass } from '../class/class.interface';

// Create a new booking class
const createBookingClass = async (payload: Partial<IBookingClass & { date_of_class: string }>, origin: string): Promise<IBookingClass | { redirectStripeUrl: string }> => {
  const { user, club, payment_method, class: classId, date_of_class } = payload;

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
  if (!date_of_class) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Date of class is required');
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
   if(isAlreadyBooked?.attandence_status === MEMBERS_STATUS.CANCEL || isAlreadyBooked?.attandence_status === MEMBERS_STATUS.WAIT) {
     await BookingClass.deleteOne({_id: isAlreadyBooked._id});
   }
  if (isAlreadyBooked?.attandence_status === MEMBERS_STATUS.ATTEND) {
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
    class_booking_ref_id: `${date_of_class.split('T')[0]}_${classExists._id}`,
  });

  if (totalBooked >= maxCapacity) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Class is fully booked');
  }


  const orderId = await generateOrderId();
  payload.booking_id = orderId;
  payload.attandence_status = MEMBERS_STATUS.ATTEND;
  payload.class_booking_ref_id = `${date_of_class.split('T')[0]}_${classExists._id}`
  // payload.class_booking_ref_id = `${classExists.date_of_class.toISOString().split('T')[0]}_${classExists._id}`
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
const addToWaitingList = async (
  payload: Partial<IBookingClass & { date_of_class: string }>
) => {
  const { user, club, class: classId, date_of_class } = payload;

  /* ------------------------------------------------------------------ */
  /* 1. Validate basic entities                                         */
  /* ------------------------------------------------------------------ */
  const [userExists, clubExists, classExists] = await Promise.all([
    User.findById(user).lean(),
    Club.findById(club).lean(),
    Class.findById(classId, 'max_number_of_attendees date_of_class').lean(),
  ]);

  if (!userExists) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  if (!clubExists) throw new ApiError(StatusCodes.NOT_FOUND, 'Club not found');
  if (!classExists) throw new ApiError(StatusCodes.NOT_FOUND, 'Class not found');
  if (!date_of_class) throw new ApiError(StatusCodes.BAD_REQUEST, 'Date of class is required');

  /* ------------------------------------------------------------------ */
  /* 2. Ensure user is a club member                                    */
  /* ------------------------------------------------------------------ */
  const isMember = clubExists.club_members.some(
    (m) => m.user_id?.toString() === user?.toString()
  );
  if (!isMember)
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'User must be a member of the club to book a class'
    );

  /* ------------------------------------------------------------------ */
  /* 3. Check if user already has any booking for this slot             */
  /* ------------------------------------------------------------------ */
  const refId = `${date_of_class.split('T')[0]}_${classExists._id}`;
  const existing = await BookingClass.findOne({
    user,
    club,
    class: classId,
    class_booking_ref_id: refId,
  });
  if (existing)
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `User already in ${existing.attandence_status} list`
    );

  /* ------------------------------------------------------------------ */
  /* 4. Count current attendees                                         */
  /* ------------------------------------------------------------------ */
  const totalBooked = await BookingClass.countDocuments({
    club,
    class: classId,
    attandence_status: MEMBERS_STATUS.ATTEND,
    class_booking_ref_id: refId,
  });

  /* ------------------------------------------------------------------ */
  /* 5. Reject if seats are still available                             */
  /* ------------------------------------------------------------------ */
  const maxCapacity = classExists.max_number_of_attendees;
  if (totalBooked < maxCapacity)
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Class has ${maxCapacity - totalBooked} seat(s) available. Please book a seat instead.`
    );

  /* ------------------------------------------------------------------ */
  /* 6. Create waiting-list entry                                       */
  /* ------------------------------------------------------------------ */
  payload.booking_id = await generateOrderId();
  payload.class_booking_ref_id = refId;

  const waitingEntry = await BookingClass.create({
    ...payload,
    attandence_status: MEMBERS_STATUS.WAIT,
  });

  /* ------------------------------------------------------------------ */
  /* 7. Notify user                                                     */
  /* ------------------------------------------------------------------ */
  const template = emailTemplate.WelcomeMessageForWaitingList(
    userExists.email as string,
    waitingEntry
  );
  emailHelper.sendEmail(template);

  return waitingEntry;
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
  }, {
    new: true,
  });

  const userExists = await User.findById(userId).lean();
  const classExists = await Class.findById(booking?.class).lean();

  if (!classExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Class not found');
  }
  if (!userExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (!booking) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');
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

  const maxCapacity = classExists.max_number_of_attendees;
  const totalBooked = await BookingClass.countDocuments({
    club: booking.club,
    class: booking.class,
    attandence_status: MEMBERS_STATUS.ATTEND,
    class_booking_ref_id: booking.class_booking_ref_id,
  });

  // WILL IVITE AS QUEUE IF CLASS IS CANCEL FOR  BOOKED
  // IF CLASS IS CANCELLED AND THERE ARE SPOTS AVAILABLE, THE NEXT USER IN THE WAITLIST SHOULD BE INVITED.

  if (booking && totalBooked === maxCapacity - 1) {
    const cronJob = cron.schedule('*/30 * * * *', async () => {
      console.log("TRIGGERED", booking.class_booking_ref_id)
      const lastOrder = await BookingClass.findOne({
        club: booking.club,
        class: booking.class,
        attandence_status: MEMBERS_STATUS.WAIT,
        class_booking_ref_id: booking.class_booking_ref_id,
        isQueued: { $ne: true }
      }, { booking_id: 1, user: 1 })
        .sort({ createdAt: 1 })
        .lean();

      console.log({ lastOrder })

      if (!lastOrder) {
        cronJob.stop();
      }


      await BookingClass.updateOne({
        _id: lastOrder?._id,
      }, {
        isQueued: true,
      });

      const userExists = await User.findById(lastOrder?.user).lean();
      if (userExists) {
        const welcomeEmailTemplate = emailTemplate.WelcomeMessageForAcceptSpeceASQue(userExists.email as string, classExists as IClass, classBookingRefId, lastOrder?.booking_id as string);
        emailHelper.sendEmail(welcomeEmailTemplate);
      }
      // WE WILL SEND EMAIL


      const currentBooked = await BookingClass.countDocuments({
        club: booking.club,
        class: booking.class,
        attandence_status: MEMBERS_STATUS.ATTEND,
        class_booking_ref_id: `${booking.class_booking_ref_id.split('_')[0]}_${classExists._id}`,
      });

      if (currentBooked >= maxCapacity) {
        cronJob.stop();
      }

    });

    cronJob.start();
  }


  return booking;
};




const getBookingAttendance = async (userId: string, classBookingRefId: string) => {
  const bookingAttendance = await BookingClass.findOne({
    user: userId,
    class_booking_ref_id: classBookingRefId,
  }).lean().populate<{ class: IClass }>('class');

  if (!bookingAttendance) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Booking attendance not found');
  }

  const occ = bookingAttendance.class;
  const totalBooked = await BookingClass.countDocuments({
    club: occ.club,
    class: occ._id,
    attandence_status: MEMBERS_STATUS.ATTEND,
    class_booking_ref_id: classBookingRefId,
  });

  // set remaining_space
  const remaining_space = occ.max_number_of_attendees - totalBooked;

  const isMyBooked = await BookingClass.exists({
    club: occ.club,
    user: userId,
    class: occ._id,
    attandence_status: MEMBERS_STATUS.ATTEND,
    class_booking_ref_id: `${occ.date_of_class.toISOString().split('T')[0]}_${occ._id}`,
  });

  return {
    ...bookingAttendance,
    class: {
      ...occ,
      remaining_space,
    },
    isMyBooked: !!isMyBooked,
  };
};

export const BookingClassService = {
  createBookingClass,
  getBookingClassesByClubId,
  addToWaitingList,
  getAllBookingAttendance,
  cancelAttendence,
  getBookingAttendance,
};