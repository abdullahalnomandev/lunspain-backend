import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import { BookingClass } from '../bookingClass/bookingClass.model';
import { CLUB_ROLE } from '../club/club.constant';
import { Club } from '../club/club.model';
import { ClubMember } from '../club/club_members/club_members.model';
import { UserCredit } from '../user/credit/user.credit.model';
import { User } from '../user/user.model';
import { MEMBERS_STATUS, REPEAT_TYPE, REPEAT_UNTIL } from './class.constant';
import { IClass } from './class.interface';
import { Class } from './class.model';
import { categorizeOccurrences, getDayIndex } from './class.util';
import { ClassStatus } from './class_status/class_status.model';
import { PAYMENT_STATUS } from '../bookingClass/booking.constant';

dayjs.extend(utc);
dayjs.extend(isoWeek);

export type Occurrence = {
  _id: string;
  class_name: string;
  club: string;
  creator: string;
  date_of_class: string;
  start_time: string;
  const_per_ticket: number;
  max_number_of_attendees: number;
  remaining_space?: number;
  booking_status?: string;
  class_mnamagers?: string[];
  class_status?:string;
  duration:string;
  delete_class?:boolean;
  reoccurring_class?:any
};

export type ClassCategories = {
  today: Occurrence[];
  thisWeek: Occurrence[];
  nextWeek: Occurrence[];
  afterNextWeek: Occurrence[];
};
// Create a new class
const createClass = async (payload: IClass) => {
  console.log(payload);
  const isClubExist = await Club.findById(payload.club).lean();
  if (!isClubExist) {
    throw new Error('Club id not correct!');
  }

  const isMemberOfClass = await ClubMember.findOne({
    user: payload.creator,
    club: payload.club,
    role: CLUB_ROLE.CLUB_MANAGER,
  });
  if (!isMemberOfClass) {
    throw new Error('Creator is not a manager of the club');
  }

  // CLEAR AND VALIDAITON REOCCORING CLASS
  const { class_mnamagers, creator, reoccurring_class } = payload;
  const {
    repeat_until,
    repeat,
    repeat_days_of_week,
    repeat_every,
    repeat_untilDate,
    total_occurrences,
  } = reoccurring_class;

  /**
   * Validation
   */
  if (!repeat_every && repeat !== REPEAT_TYPE.NONE)
    throw new Error('Repeat every is require');
  // FOR DAY
  if (repeat_until === REPEAT_UNTIL.AFTER_OCCURRENCES && !total_occurrences)
    throw new Error('Total occurences number is require');
  else {
    delete payload.reoccurring_class.repeat_untilDate;
  }

  if (repeat_until === REPEAT_UNTIL.UNTIL_DATE && !repeat_untilDate) {
    throw new Error('Repeat until Date is require');
  }

  // FOR WEEK
  if (repeat === REPEAT_TYPE.WEEKLY && !repeat_days_of_week)
    throw new Error('Repeat day of week is require');

  if (class_mnamagers.length > 2) {
    throw new Error('You can only create a club with up to 2 members');
  }

  class_mnamagers.push(creator as unknown as Types.ObjectId);

  const klass = await Class.create(payload);
  await klass.populate('club', 'name address');

  // SEND EMAILS
  const leaders = await User.find({ _id: { $in: klass.class_mnamagers } })
    .lean()
    .select('-_id email');
  console.log(leaders);

  leaders.map(({ email }) => {
    const welcomeEmailTemplate = emailTemplate.WelcomMessageForClassCreation(
      email as string,
      klass
    );
    emailHelper.sendEmail(welcomeEmailTemplate);
  });

  return klass;
};

// Get classes by club id
const generateOccurrences = (
  cls: any,
  startDateOfClass?: string,
  maxDateInput?: string
): Occurrence[] => {
  const occurrences: Occurrence[] = [];

  // Determine "today" as the earliest date to consider
  // Priority: startDateInput > today
  const today = startDateOfClass ? dayjs(startDateOfClass).startOf('day').add(1, 'day'): dayjs().startOf('day');

  // Determine maxDate as the latest date allowed
  const maxDate = maxDateInput
    ? dayjs(maxDateInput).endOf('day')
    : dayjs().add(1, 'year').endOf('day');

  // Debug for testing
  // console.log({ today: today.toISOString(), maxDate: maxDate.toISOString() });

  let current =  dayjs(startDateOfClass ? startDateOfClass : cls.date_of_class).startOf('day');

  // REPEAT NONE/ONCE
  if (cls.reoccurring_class.repeat === REPEAT_TYPE.NONE) {
    if (current.isSame(today) || current.isAfter(today)) {
      occurrences.push({ ...cls, date_of_class: current.toISOString() });
    }
    return occurrences;
  }

  const repeatUntil = cls.reoccurring_class.repeat_until;

  // REPEAT DAILY
  if (cls.reoccurring_class.repeat === REPEAT_TYPE.DAILY) {
    const repeatEvery = cls.reoccurring_class.repeat_every || 1;

    let count = 0;
    let totalOccurrences = Infinity;
    let untilDate = maxDate;

    if (repeatUntil === REPEAT_UNTIL.AFTER_OCCURRENCES) {
      totalOccurrences = cls.reoccurring_class.total_occurrences ?? Infinity;
    } else if (repeatUntil === REPEAT_UNTIL.UNTIL_DATE) {
      untilDate = cls.reoccurring_class.repeat_untilDate
        ? dayjs(cls.reoccurring_class.repeat_untilDate).endOf('day')
        : maxDate;
    } else if (repeatUntil === REPEAT_UNTIL.FOREVER) {
      untilDate = dayjs().add(1, 'year').endOf('day');
    }

    while (
      (current.isSame(untilDate) || current.isBefore(untilDate)) &&
      count < totalOccurrences &&
      (current.isSame(maxDate) || current.isBefore(maxDate))
    ) {
      if (current.isSame(today) || current.isAfter(today)) {
        occurrences.push({ ...cls, date_of_class: current.toISOString() });
      }

      current = current.add(repeatEvery, 'day');
      count++;
    }
    console.log({totalOccurrences:cls.reoccurring_class.total_occurrences})
  }
  // REPEAT WEEKLY
  else if (cls.reoccurring_class.repeat === REPEAT_TYPE.WEEKLY) {
    const repeatEvery = cls.reoccurring_class.repeat_every || 1;
    const repeatDays = cls.reoccurring_class.repeat_days_of_week || [];

    let count = 0;
    let totalOccurrences = Infinity;
    let untilDate = maxDate;

    if (repeatUntil === REPEAT_UNTIL.AFTER_OCCURRENCES) {
      totalOccurrences = cls.reoccurring_class.total_occurrences ?? Infinity;
    } else if (repeatUntil === REPEAT_UNTIL.UNTIL_DATE) {
      untilDate = cls.reoccurring_class.repeat_untilDate
        ? dayjs(cls.reoccurring_class.repeat_untilDate).endOf('day')
        : maxDate;
    } else if (repeatUntil === REPEAT_UNTIL.FOREVER) {
      untilDate = dayjs().add(1, 'year').endOf('day');
    }

    let currentWeekStart = dayjs(cls.date_of_class).startOf('week');
    while (
      (currentWeekStart.isSame(untilDate) || currentWeekStart.isBefore(untilDate)) &&
      count < totalOccurrences
    ) {
      for (const dayName of repeatDays) {
        let dayIndex = getDayIndex(dayName);
        let current = currentWeekStart.day(dayIndex);

        if (
          (current.isSame(today) || current.isAfter(today)) &&
          (current.isSame(untilDate) || current.isBefore(untilDate)) &&
          (current.isSame(maxDate) || current.isBefore(maxDate)) &&
          count < totalOccurrences
        ) {
          occurrences.push({ ...cls, date_of_class: current.toISOString() });
          count++;
        }
      }
      currentWeekStart = currentWeekStart.add(repeatEvery, 'week');
    }
  }

  // REPEAT MONTHLY
  else if (cls.reoccurring_class.repeat === REPEAT_TYPE.MONTHLY) {
    const repeatEvery = cls.reoccurring_class.repeat_every || 1;
    const dayOfMonth = cls.reoccurring_class.day_of_month;
    const periodOfMonth = cls.reoccurring_class.period_of_month;
    const periodOfDay = cls.reoccurring_class.period_of_day;

    let count = 0;
    let totalOccurrences = Infinity;
    let untilDate = maxDate;

    if (repeatUntil === REPEAT_UNTIL.AFTER_OCCURRENCES) {
      totalOccurrences = cls.reoccurring_class.total_occurrences ?? Infinity;
    } else if (repeatUntil === REPEAT_UNTIL.UNTIL_DATE) {
      untilDate = cls.reoccurring_class.repeat_untilDate
        ? dayjs(cls.reoccurring_class.repeat_untilDate).endOf('day')
        : maxDate;
    } else if (repeatUntil === REPEAT_UNTIL.FOREVER) {
      untilDate = dayjs().add(1, 'year').endOf('day');
    }

    let current = dayjs(cls.date_of_class);

    while (
      (current.isSame(untilDate) || current.isBefore(untilDate)) &&
      count < totalOccurrences
    ) {
      let nextOccurrence: dayjs.Dayjs | null = null;

      // CASE 1: specific day of month
      if (dayOfMonth) {
        nextOccurrence = current.date(dayOfMonth);
        if (nextOccurrence.date() !== dayOfMonth) {
          nextOccurrence = null;
        }
      }
      // CASE 2: specific period/day (like "second Monday")
      else if (periodOfMonth && periodOfDay) {
        const firstDayOfMonth = current.startOf('month');
        const lastDayOfMonth = current.endOf('month');

        const targetDayIndex = getDayIndex(periodOfDay);
        const monthDays: dayjs.Dayjs[] = [];

        for (
          let d = firstDayOfMonth;
          d.isBefore(lastDayOfMonth) || d.isSame(lastDayOfMonth);
          d = d.add(1, 'day')
        ) {
          if (d.day() === targetDayIndex) {
            monthDays.push(d);
          }
        }

        if (periodOfMonth === 'last') {
          nextOccurrence = monthDays[monthDays.length - 1];
        } else {
          const map = { first: 0, second: 1, third: 2, fourth: 3 };
          const index = map[periodOfMonth as keyof typeof map];
          nextOccurrence = monthDays[index] || null;
        }

        // Special support for "weekday", "weekend", "day"
        if (['weekday', 'weekend', 'day'].includes(periodOfDay)) {
          const isWeekend = (d: dayjs.Dayjs) => d.day() === 0 || d.day() === 6;
          const days = [];

          for (
            let d = firstDayOfMonth;
            d.isBefore(lastDayOfMonth) || d.isSame(lastDayOfMonth);
            d = d.add(1, 'day')
          ) {
            if (
              (periodOfDay === 'weekday' && !isWeekend(d)) ||
              (periodOfDay === 'weekend' && isWeekend(d)) ||
              periodOfDay === 'day'
            ) {
              days.push(d);
            }
          }

          if (periodOfMonth === 'last') nextOccurrence = days[days.length - 1];
          else {
            const map = { first: 0, second: 1, third: 2, fourth: 3 };
            const index = map[periodOfMonth as keyof typeof map];
            nextOccurrence = days[index] || null;
          }
        }
      }

      if (
        nextOccurrence &&
        (nextOccurrence.isSame(today) || nextOccurrence.isAfter(today)) &&
        (nextOccurrence.isSame(untilDate) || nextOccurrence.isBefore(untilDate)) &&
        (nextOccurrence.isSame(maxDate) || nextOccurrence.isBefore(maxDate))
      ) {
        occurrences.push({
          ...cls,
          date_of_class: nextOccurrence.toISOString(),
        });
        count++;
      }

      current = current.add(repeatEvery, 'month').startOf('month');
    }
  }
  // REPEAT YEARLY
  else if (cls.reoccurring_class.repeat === REPEAT_TYPE.YEARLY) {
    const repeatMonth = cls.reoccurring_class.repeat_every || 1;
    const dayOfMonth = cls.reoccurring_class.day_of_month;
    const periodOfMonth = cls.reoccurring_class.period_of_month;
    const periodOfDay = cls.reoccurring_class.period_of_day;

    let count = 0;
    let totalOccurrences = Infinity;
    let untilDate = dayjs().add(1, 'year').endOf('day');

    if (repeatUntil === REPEAT_UNTIL.AFTER_OCCURRENCES) {
      totalOccurrences = cls.reoccurring_class.total_occurrences ?? Infinity;
    } else if (repeatUntil === REPEAT_UNTIL.UNTIL_DATE) {
      untilDate = cls.reoccurring_class.repeat_untilDate
        ? dayjs(cls.reoccurring_class.repeat_untilDate).endOf('day')
        : maxDate;
    } else if (repeatUntil === REPEAT_UNTIL.FOREVER) {
      untilDate = dayjs().add(1, 'year').endOf('day');
    }

    let base = dayjs(cls.date_of_class);
    let startYear = base.year();

    while (true) {
      if (count >= totalOccurrences) break;

      let year = startYear + count;
      let currentMonth = dayjs().year(year).month(repeatMonth - 1).startOf('month');

      if (currentMonth.isAfter(untilDate) || currentMonth.isAfter(maxDate)) break;

      let nextOccurrence: dayjs.Dayjs | null = null;

      if (dayOfMonth) {
        nextOccurrence = currentMonth.date(dayOfMonth);
        if (
          nextOccurrence.month() !== repeatMonth - 1 ||
          nextOccurrence.date() !== dayOfMonth
        ) {
          nextOccurrence = null;
        }
      } else if (periodOfMonth && periodOfDay) {
        const firstDayOfMonth = currentMonth.startOf('month');
        const lastDayOfMonth = currentMonth.endOf('month');
        let matchingDays: dayjs.Dayjs[] = [];

        if (!['weekday', 'weekend', 'day'].includes(periodOfDay)) {
          const targetDayIndex = getDayIndex(periodOfDay);
          for (
            let d = firstDayOfMonth;
            d.isBefore(lastDayOfMonth) || d.isSame(lastDayOfMonth);
            d = d.add(1, 'day')
          ) {
            if (d.day() === targetDayIndex) {
              matchingDays.push(d);
            }
          }
        } else {
          const isWeekend = (d: dayjs.Dayjs) => d.day() === 0 || d.day() === 6;
          for (
            let d = firstDayOfMonth;
            d.isBefore(lastDayOfMonth) || d.isSame(lastDayOfMonth);
            d = d.add(1, 'day')
          ) {
            if (
              (periodOfDay === 'weekday' && !isWeekend(d)) ||
              (periodOfDay === 'weekend' && isWeekend(d)) ||
              periodOfDay === 'day'
            ) {
              matchingDays.push(d);
            }
          }
        }

        if (periodOfMonth === 'last') {
          nextOccurrence =
            matchingDays.length > 0
              ? matchingDays[matchingDays.length - 1]
              : null;
        } else {
          const map = { first: 0, second: 1, third: 2, fourth: 3 };
          const index = map[periodOfMonth as keyof typeof map];
          nextOccurrence = matchingDays[index] || null;
        }
      }

      if (
        nextOccurrence &&
        (nextOccurrence.isSame(today) || nextOccurrence.isAfter(today)) &&
        (nextOccurrence.isSame(untilDate) || nextOccurrence.isBefore(untilDate)) &&
        (nextOccurrence.isSame(maxDate) || nextOccurrence.isBefore(maxDate))
      ) {
        occurrences.push({
          ...cls,
          date_of_class: nextOccurrence.toISOString(),
        });
        count++;
      } else {
        count++;
      }
    }
  }

  return occurrences;
};


const generateOccurrencesToGetBook = async (
  clubId: string,
  userId: string
): Promise<Occurrence[]> => {
  const occurrences: Occurrence[] = [];

  const bookings = await BookingClass.find({
    club: clubId,
    user: userId,
    payment_status:{$ne:PAYMENT_STATUS.PENDING}
  })
    .populate({
      path: 'class',
      select:
        'date_of_class start_time class_booking_ref_id reoccurring_class club reoccurring_class duration delete_class creator class_status const_per_ticket max_number_of_attendees class_name delete_class class_mnamagers',
    })
    .lean();

  for (const booking of bookings) {
    const cls: any = booking.class;
    if (!cls || cls.delete_class) continue;

    const [dateStr] = (booking.class_booking_ref_id || '').split('_');
    const dateOfClass = dateStr
      ? dayjs(dateStr).startOf('day').toISOString()
      : dayjs(cls.date_of_class).startOf('day').toISOString();

      console.log('t',dateStr)

    occurrences.push({
      _id: cls._id?.toString?.() ?? cls._id,
      class_name: cls.class_name,
      club: cls.club,
      creator: cls.creator,
      date_of_class: dateOfClass,
      start_time: cls.start_time,
      const_per_ticket: cls.const_per_ticket,
      max_number_of_attendees: cls.max_number_of_attendees,
      class_mnamagers: cls.class_mnamagers,
      duration : cls.duration,
      class_status:cls.class_status,
      delete_class:cls.delete_class,
      reoccurring_class:cls.reoccurring_class
    });
  }

  return occurrences;
};
export const getClassesByClubId = async (
  clubId: string,
  userId: string,
  query: Record<string, any>
): Promise<ClassCategories & { userCredit: any }> => {
  console.log(query.daysFromToday);

  const maxData = dayjs().add(query.daysFromToday - 1, 'day').startOf('day').toISOString();
  const startDate = query.startDate ? dayjs(query.startDate).startOf('day').add(1, 'day').toISOString(): '';

  console.log(maxData);

  const classes = await Class.find(
    { club: clubId, delete_class: false },
    'date_of_class duration start_time reoccurring_class club creator class_status const_per_ticket max_number_of_attendees class_name delete_class class_mnamagers'
  ).lean();

  const allOccurrences: Occurrence[] = [];
  for (const cls of classes) {
    const occurrences = generateOccurrences(cls, startDate , maxData); // prevent mutation
    allOccurrences.push(...occurrences);
  }

  const userCredit = (await UserCredit.findOne({
    club: clubId,
    user: userId,
  })?.lean()) ?? { credit: 0 };

  return {
    userCredit: userCredit.credit,
    ...(await categorizeOccurrences(allOccurrences, userId)),
  };
};

export const getBookedClasses = async (
  clubId: string,
  userId: string,
  query: Record<string, any>
): Promise<ClassCategories & { userCredit: any }> => {

  const allOccurrences: Occurrence[] = await generateOccurrencesToGetBook(
    clubId,
    userId
  );


  const userCredit = (await UserCredit.findOne({
    club: clubId,
    user: userId,
  })?.lean()) ?? { credit: 0 };

  return {
    userCredit: userCredit.credit,
    ...(await categorizeOccurrences(allOccurrences, userId)),
  };
};

export const getClassSchedule = async (
  user_id: string,
  class_id: string,
  class_start_date: string
): Promise<any> => {
  // 🟢 Fetch class and club info together efficiently
  const existClass = await Class.findById(class_id)
    .populate({
      path: 'club',
      select: '_id allow_waiting_list allow_class_cancelation payment',
    })
    .populate({
      path: 'creator',
      select: 'profile.firstName profile.lastName profile.image profile.username',
    })
    .lean();

  if (!existClass) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Class not found');
  }

  const bookingRefId = `${class_start_date.split('T')[0]}_${existClass._id}`;

  // 🟢 Run these 3 in parallel to reduce I/O waits
  const [creditDoc, allBookings, myBookings] = await Promise.all([
    UserCredit.findOne({ club: existClass.club, user: user_id })
      .select('credit')
      .lean(),
    BookingClass.find({
      class: existClass._id,
      class_booking_ref_id: bookingRefId,
    })
      .select('attandence_status user')
      .lean(),
    BookingClass.findOne({
      class: existClass._id,
      user: user_id,
      class_booking_ref_id: bookingRefId,
    })
      .select('attandence_status')
      .lean(),
  ]);

  // 🟢 Aggregate counts in-memory instead of multiple DB calls
  const attendanceSummary = {
    attend: allBookings.filter(
      (b: any) => b.attandence_status === MEMBERS_STATUS.ATTEND
    ).length,
    wait: allBookings.filter(
      (b: any) => b.attandence_status === MEMBERS_STATUS.WAIT
    ).length,
    cancel: allBookings.filter(
      (b: any) => b.attandence_status === MEMBERS_STATUS.CANCEL
    ).length,
  };

  const totalBooked = attendanceSummary.attend;

  // 🟢 Check if user is a manager (class member)
  const isLeader = Array.isArray(existClass.class_mnamagers)
    ? existClass.class_mnamagers.find(
        (userId: Types.ObjectId) => userId?.toString() === user_id
      )
    : false;

  const getStatus = await ClassStatus.findOne({
    class_booking_ref_id: bookingRefId,
  });

  const classData: any = {
    ...existClass,
    allow_waiting_list: (existClass.club as any)?.allow_waiting_list || false,
    allow_class_cancelation:
      (existClass.club as any)?.allow_class_cancelation || false,
    total_user_credit: creditDoc?.credit || 0,
    in_person_payment:
      (existClass.club as any)?.payment?.in_person_payment || false,
    remaining_space: existClass.max_number_of_attendees - totalBooked,
    attendance_summary: attendanceSummary,
    isLeader: !!isLeader,
    ...(isLeader && { is_visiable: getStatus?.is_visiable }),
  };

  // 🟢 Determine user's booking status (from myBookings)
  if ((myBookings?.attandence_status as any) === MEMBERS_STATUS.ATTEND) {
    classData.booking_status = 'attended';
  } else if ((myBookings?.attandence_status as any) === MEMBERS_STATUS.CANCEL) {
    classData.booking_status = 'canceled';
  } else {
    classData.booking_status =
      totalBooked >= existClass.max_number_of_attendees ? 'full' : 'available';
  }

  return classData;
};

const deleteClass = async (userId: string, id: string) => {
  const cls = await Class.findById(id).lean().select('+delete_class');
  if (!cls) throw new ApiError(StatusCodes.NOT_FOUND, 'Class not found');

  if (cls.delete_class) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Class already deleted...');
  }
  console.log(cls);

  const isLeader = cls.class_mnamagers.find(
    (user: any) => user.toString() === userId
  );
  if (!isLeader)
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      'Only class leaders can delete this class'
    );

  console.log({ id });
  const deletedClass = await Class.findByIdAndUpdate(
    id,
    { delete_class: true },
    { new: true }
  );
  return deletedClass;
};

const updateClass = async (
  payload: IClass & { club_id: string; class_id: string }
) => {
  // Validate club exists
  const [clubExist, classExist, isMemberOfClass] = await Promise.all([
    Club.findById(payload.club_id).lean().select('_id'),
    Class.findById(payload.class_id).lean().select('_id'),
    ClubMember.findOne({
      user: payload.creator,
      club: payload.club_id,
      role: CLUB_ROLE.CLUB_MANAGER,
    }),
  ]);

  if (!clubExist) {
    throw new Error('Club id not correct!');
  }

  if (!classExist) {
    throw new Error('Class id not correct!');
  }

  if (!isMemberOfClass) {
    throw new Error('Creator is not a manager of the club');
  }

  // Update the class
  const updatedClass = await Class.findByIdAndUpdate(
    payload.class_id,
    payload,
    { new: true, runValidators: true }
  );

  if (!updatedClass) {
    throw new Error('Class not found');
  }

  // SEND EMAILS
  // const club_membersIds = updatedClass.class_members
  //     .filter(({ role }) => role === CLASS_ROLE.CLASS_LEADER)
  //     .map(({ user }) => user);
  // const leaders = await User.find({ _id: { $in: club_membersIds } }).lean().select('email');

  // leaders.forEach(({ email }) => {
  //     const welcomeEmailTemplate = emailTemplate.WelcomMessageForClassCreation(email as string);
  //     emailHelper.sendEmail(welcomeEmailTemplate);
  // });

  return updatedClass;
};

const updateStatus = async (payload: {
  club: string;
  class: string;
  date_of_class: string;
  is_visiable: boolean;
  creator: string;
}) => {
  // Validate club, class, and manager role
  const [clubExist, classExist, isMemberOfClass] = await Promise.all([
    Club.findById(payload.club).lean().select('_id'),
    Class.findById(payload.class).lean().select('_id'),
    ClubMember.findOne({
      user: payload.creator,
      club: payload.club,
      role: CLUB_ROLE.CLUB_MANAGER,
    }),
  ]);

  if (!clubExist) throw new Error('Club id not correct!');
  if (!classExist) throw new Error('Class id not correct!');
  if (!isMemberOfClass) throw new Error('Creator is not a manager of the club');

  const classStatus_ref_id = `${payload.date_of_class.split('T')[0]}_${
    payload.class
  }`;

  // Check if ClassStatus exists with class_booking_ref_id
  const existingStatus = await ClassStatus.findOne({
    class_booking_ref_id: classStatus_ref_id,
    club: clubExist._id,
  });

  let updatedStatus;
  if (existingStatus) {
    // 🔁 Update existing record
    updatedStatus = await ClassStatus.findOneAndUpdate(
      { class_booking_ref_id: classStatus_ref_id, club: existingStatus.club },
      {
        is_visiable: payload.is_visiable,
      },
      { new: true, runValidators: true }
    );
  } else {
    // 🆕 Create new record
    updatedStatus = await ClassStatus.create({
      class_booking_ref_id: classStatus_ref_id,
      club: payload.club,
      is_visiable: payload.is_visiable,
    });
  }

  return updatedStatus;
};

export const ClassService = {
  createClass,
  getClassesByClubId,
  getBookedClasses,
  getClassSchedule,
  deleteClass,
  updateClass,
  updateStatus,
};
