import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import { Club } from '../club/club.model';
import { User } from '../user/user.model';
import { CLASS_ROLE, MEMBERS_STATUS, REPEAT_TYPE, REPEAT_UNTIL } from './class.constant';
import { IClass } from './class.interface';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isoWeek from "dayjs/plugin/isoWeek";
import { Class } from './class.model';
import { IUserCredit, UserCredit } from '../user/credit/user.credit.model';
import { BookingClass } from '../bookingClass/bookingClass.model';
import { ClubMember } from '../club/club_members/club_members.model';
import { CLUB_ROLE } from '../club/club.constant';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

dayjs.extend(utc);
dayjs.extend(isoWeek);

type Occurrence = {
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
};

type ClassCategories = {
    today: Occurrence[];
    thisWeek: Occurrence[];
    nextWeek: Occurrence[];
    nextMonth: Occurrence[];
    nextYear: Occurrence[];
};
// Create a new class
const createClass = async (payload: IClass) => {

    console.log(payload)
    const isClubExist = await Club.findById(payload.club).lean('_id');
    if (!isClubExist) {
        throw new Error('Club id not correct!');
    }

    const isMemberOfClass = await ClubMember.findOne({
        user: payload.creator,
        club: payload.club,
        role: CLUB_ROLE.CLUB_MANAGER
    });
    if (!isMemberOfClass) {
        throw new Error('Creator is not a member of the club');
    }

    // CLEAR AND VALIDAITON REOCCORING CLASS
    const { class_members, creator, reoccurring_class } = payload;
    const { repeat_until, repeat, repeat_days_of_week, repeat_every, repeat_untilDate, total_occurrences } = reoccurring_class;


    /**
     * Validation
     */
    if (!repeat_every && repeat !== REPEAT_TYPE.NONE) throw new Error('Repeat every is require');
    // FOR DAY
    if (repeat_until === REPEAT_UNTIL.AFTER_OCCURRENCES && !total_occurrences) throw new Error('Total occurences number is require');
    else {
        delete payload.reoccurring_class.repeat_untilDate
    }

    if (repeat_until === REPEAT_UNTIL.UNTIL_DATE && !repeat_untilDate) {
        throw new Error('Repeat until Date is require');
    }

    // FOR WEEK
    if (repeat === REPEAT_TYPE.WEEKLY && !repeat_days_of_week) throw new Error('Repeat day of week is require');



    if (class_members.length >= 2) {
        throw new Error('You can only create a club with up to 2 members');
    }
    class_members.map((mem) => {
        if (mem.status !== MEMBERS_STATUS.LEADER) throw new Error('All class members except the creator must have status LEADER');

    })
    class_members.push({ user: creator, role: CLASS_ROLE.CLASS_LEADER, status: MEMBERS_STATUS.LEADER });



    const klass = await Class.create(payload);

    // SEND EMASILS
    const club_membersIds = klass.class_members.filter(({ role }) => role === CLASS_ROLE.CLASS_LEADER).map(({ user }) => user)
    const leaders = await User.find({ _id: { $in: club_membersIds } }).lean().select('-_id email');
    console.log(leaders)

    leaders.map(({ email }) => {
        const welcomeEmailTemplate = emailTemplate.WelcomMessageForClassCreation(email as string);
        emailHelper.sendEmail(welcomeEmailTemplate);
    })


    return klass;
};



// Get classes by club id
const generateOccurrences = (cls: any): Occurrence[] => {
    const occurrences: Occurrence[] = [];
    const today = dayjs().startOf("day");
    const maxDate = dayjs().add(1, "year").endOf("day"); // cap 1 year for forever

    let current = dayjs(cls.date_of_class).startOf("day");

    if (cls.reoccurring_class.repeat === "none") {
        // only show if today or future
        if (current.isSame(today) || current.isAfter(today)) {
            occurrences.push({ ...cls, date_of_class: current.toISOString() });
        }
        return occurrences;
    }

    if (cls.reoccurring_class.repeat === "daily") {
        const repeatEvery = cls.reoccurring_class.repeat_every || 1;

        let count = 0;
        let totalOccurrences =
            cls.reoccurring_class.total_occurrences || Infinity;
        let untilDate = cls.reoccurring_class.repeat_untilDate
            ? dayjs(cls.reoccurring_class.repeat_untilDate).endOf("day")
            : maxDate;

        // adjust max date if repeat_until is forever
        if (cls.reoccurring_class.repeat_until === "forever") {
            untilDate = dayjs().add(1, "year").endOf("day");
        }

        while (
            (current.isSame(untilDate) || current.isBefore(untilDate)) &&
            count < totalOccurrences &&
            (current.isSame(maxDate) || current.isBefore(maxDate))
        ) {
            if (current.isSame(today) || current.isAfter(today)) {
                occurrences.push({ ...cls, date_of_class: current.toISOString() });
            }

            current = current.add(repeatEvery, "day");
            count++;
        }
    }

    if (cls.reoccurring_class.repeat === "weekly") {
        const repeatEvery = cls.reoccurring_class.repeat_every || 1;
        const repeatDaysOfWeek = cls.reoccurring_class.repeat_days_of_week || [];

        let count = 0;
        let totalOccurrences =
            cls.reoccurring_class.total_occurrences || Infinity;
        let untilDate = cls.reoccurring_class.repeat_untilDate
            ? dayjs(cls.reoccurring_class.repeat_untilDate).endOf("day")
            : maxDate;

        // adjust max date if repeat_until is forever
        if (cls.reoccurring_class.repeat_until === "forever") {
            untilDate = dayjs().add(1, "year").endOf("day");
        }

        // Helper to map day names to dayjs day numbers
        const dayNameToNumber = (dayName: string): number => {
            const map: Record<string, number> = {
                sunday: 0,
                monday: 1,
                tuesday: 2,
                wednesday: 3,
                thursday: 4,
                friday: 5,
                saturday: 6,
            };
            return map[dayName.toLowerCase()];
        };

        const allowedWeekdays = repeatDaysOfWeek.map(dayNameToNumber);

        // Start from the first occurrence date
        let weekCursor = current.clone().startOf("week"); // Start of the week of the initial date

        while (
            (weekCursor.isSame(untilDate) || weekCursor.isBefore(untilDate)) &&
            count < totalOccurrences &&
            (weekCursor.isSame(maxDate) || weekCursor.isBefore(maxDate))
        ) {
            // Iterate over each allowed weekday in the current week
            for (const dayOfWeek of allowedWeekdays) {
                const candidate = weekCursor.clone().day(dayOfWeek);

                // Skip if candidate is before the initial class date
                if (candidate.isBefore(current)) continue;

                // Skip if candidate is beyond untilDate or maxDate
                if (candidate.isAfter(untilDate) || candidate.isAfter(maxDate)) continue;

                // Skip if we've reached totalOccurrences
                if (count >= totalOccurrences) break;

                // Only include if today or future
                if (candidate.isSame(today) || candidate.isAfter(today)) {
                    occurrences.push({ ...cls, date_of_class: candidate.toISOString() });
                    count++;
                }
            }

            // Move to the next repeatEvery week
            weekCursor = weekCursor.add(repeatEvery, "week");
        }
    }

    return occurrences;
};

// Utility: categorize occurrences into today / thisWeek / nextWeek / nextMonth / nextYear
const categorizeOccurrences = async (occurrences: Occurrence[], userId: string): Promise<ClassCategories> => {
    const today = dayjs().startOf("day");

    const startOfThisWeek = today.startOf("isoWeek");
    const endOfThisWeek = today.endOf("isoWeek");

    const startOfNextWeek = endOfThisWeek.add(1, "day").startOf("isoWeek");
    const endOfNextWeek = startOfNextWeek.endOf("isoWeek");

    const startOfNextMonth = today.add(1, "month").startOf("month");
    const endOfNextMonth = today.add(1, "month").endOf("month");

    const startOfNextYear = today.add(1, "year").startOf("year");
    const endOfNextYear = today.add(1, "year").endOf("year");

    const result: ClassCategories = {
        today: [],
        thisWeek: [],
        nextWeek: [],
        nextMonth: [],
        nextYear: []
    };

    for (const occ of occurrences) {
        const totalBooked = await BookingClass.countDocuments({
            club: occ.club,
            class: occ._id,
            attandence_status: MEMBERS_STATUS.ATTEND,
            class_booking_ref_id: `${occ.date_of_class.split('T')[0]}_${occ._id}`
        });

        // ✅ Correct remaining seat calculation
        //@ts-ignore
        occ.remaining_space = occ.max_number_of_attendees - totalBooked;
        const isMyBooked = await BookingClass.exists({
            club: occ.club,
            user: userId,
            class: occ._id,
            attandence_status: MEMBERS_STATUS.ATTEND,
            class_booking_ref_id: `${occ.date_of_class.split('T')[0]}_${occ._id}`
        });

        const isCanceled = await BookingClass.exists({
            club: occ.club,
            user: userId,
            class: occ._id,
            attandence_status: MEMBERS_STATUS.CANCEL,
            class_booking_ref_id: `${occ.date_of_class.split('T')[0]}_${occ._id}`
        });
        if (isMyBooked) {
            occ.booking_status = 'attended';
        } else if (isCanceled) {
            occ.booking_status = 'canceled';
        } else {
            occ.booking_status = totalBooked >= occ.max_number_of_attendees ? 'full' : 'available';
        }

        const occDate = dayjs(occ.date_of_class);

        if (occDate.isSame(today, "day")) {
            result.today.push(occ);
        } else if (occDate.isAfter(today) && (occDate.isSame(startOfThisWeek) || occDate.isAfter(startOfThisWeek)) && occDate.isBefore(endOfThisWeek.add(1, 'day'))) {
            result.thisWeek.push(occ);
        } else if (occDate.isAfter(startOfNextWeek.subtract(1, 'day')) && occDate.isBefore(endOfNextWeek.add(1, 'day'))) {
            result.nextWeek.push(occ);
        } else if (occDate.isAfter(startOfNextMonth.subtract(1, 'day')) && occDate.isBefore(endOfNextMonth.add(1, 'day'))) {
            result.nextMonth.push(occ);
        } else if (occDate.isAfter(startOfNextYear.subtract(1, 'day')) && occDate.isBefore(endOfNextYear.add(1, 'day'))) {
            result.nextYear.push(occ);
        }
    }

    return result;
};

// Main function: get classes by clubId
export const getClassesByClubId = async (clubId: string, userId: string): Promise<ClassCategories & { userCredit: any }> => {
    const classes = await Class.find(
        { club: clubId },
        "date_of_class duration start_time reoccurring_class club creator class_status const_per_ticket max_number_of_attendees class_name"
    ).lean();

    const allOccurrences: Occurrence[] = [];
    for (const cls of classes) {
        const occurrences = generateOccurrences(cls); // prevent mutation
        allOccurrences.push(...occurrences);
    }


    const userCredit = await UserCredit.findOne({ clubId, user: userId }).lean() || { credit: 0 };

    return {
        userCredit: userCredit.credit,
        ...(await categorizeOccurrences(allOccurrences, userId))
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
        .lean();

    if (!existClass) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Class not found');
    }


    const bookingRefId = `${class_start_date.split('T')[0]}_${existClass._id}`;

    // 🟢 Run these 3 in parallel to reduce I/O waits
    const [creditDoc, allBookings, myBookings] = await Promise.all([
        UserCredit.findOne({ club: existClass.club._id, user: user_id })
            .select('credit')
            .lean(),
        BookingClass.find({
            class: existClass._id,
            class_booking_ref_id: bookingRefId,
        })
            .select('attandence_status user')
            .lean(),
        BookingClass.find({
            class: existClass._id,
            user: user_id,
            class_booking_ref_id: bookingRefId,
        })
            .select('attandence_status')
            .lean(),
    ]);

    // 🟢 Aggregate counts in-memory instead of multiple DB calls
    const attendanceSummary = {
        attend: allBookings.filter(b => b.attandence_status === MEMBERS_STATUS.ATTEND).length,
        wait: allBookings.filter(b => b.attandence_status === MEMBERS_STATUS.WAIT).length,
        cancel: allBookings.filter(b => b.attandence_status === MEMBERS_STATUS.CANCEL).length,
    };

    const totalBooked = attendanceSummary.attend;

    // 🟢 Check if user is a manager (class member)
    const isManager = Array.isArray(existClass.class_members)
        ? existClass.class_members.some(
            (member: any) => member.user?.toString() === user_id.toString()
        )
        : false;

    const classData: any = {
        ...existClass,
        allow_waiting_list: existClass.club?.allow_waiting_list || false,
        allow_class_cancelation: existClass.club?.allow_class_cancelation || false,
        total_user_credit: creditDoc?.credit || 0,
        in_person_payment: existClass.club?.payment?.in_person_payment || false,
        remaining_space: existClass.max_number_of_attendees - totalBooked,
        attendance_summary: attendanceSummary,
        is_manager: isManager,

    };

    // 🟢 Determine user's booking status (from myBookings)
    const myStatus = myBookings[0]?.attandence_status;
    if (myStatus === MEMBERS_STATUS.ATTEND) {
        classData.booking_status = 'attended';
    } else if (myStatus === MEMBERS_STATUS.CANCEL) {
        classData.booking_status = 'canceled';
    } else {
        classData.booking_status =
            totalBooked >= existClass.max_number_of_attendees ? 'full' : 'available';
    }


    return classData;
};


export const ClassService = {
    createClass,
    getClassesByClubId,
    getClassSchedule
};

//     reoccurring_class: {
//     repeat: REPEAT_TYPE; // repeat type
//     repeat_every: number; //repeat time
//     repeat_days_of_week: (DAY_OF_WEEK)[]; //if select weekly || yearlly
//     day_of_month: number; // if select repeat montyley
//     repeat_until ?: REPEAT_UNTIL; // ex: forever
//     total_occurrences ?: number // If select after_occurences
//     repeat_untilDate ?: Date // If select until_date // ISO date string: "YYYY-MM-DD"
// },

// const generateOccurrences = (cls: any): Occurrence[] => {
//     const occurrences: Occurrence[] = [];
//     const today = dayjs().startOf("day");
//     const maxDate = dayjs().add(1, "year").endOf("day"); // cap 1 year for forever

//     let current = dayjs(cls.date_of_class).startOf("day");

//     if (cls.reoccurring_class.repeat === "none") {
//         // only show if today or future
//         if (current.isSame(today) || current.isAfter(today)) {
//             occurrences.push({ ...cls, date_of_class: current.toISOString() });
//         }
//         return occurrences;
//     }

//     if (cls.reoccurring_class.repeat === "daily") {
//         const repeatEvery = cls.reoccurring_class.repeat_every || 1;

//         let count = 0;
//         let totalOccurrences =
//             cls.reoccurring_class.total_occurrences || Infinity;
//         let untilDate = cls.reoccurring_class.repeat_untilDate
//             ? dayjs(cls.reoccurring_class.repeat_untilDate).endOf("day")
//             : maxDate;

//         // adjust max date if repeat_until is forever
//         if (cls.reoccurring_class.repeat_until === "forever") {
//             untilDate = dayjs().add(1, "year").endOf("day");
//         }

//         while (
//             (current.isSame(untilDate) || current.isBefore(untilDate)) &&
//             count < totalOccurrences &&
//             (current.isSame(maxDate) || current.isBefore(maxDate))
//         ) {
//             if (current.isSame(today) || current.isAfter(today)) {
//                 occurrences.push({ ...cls, date_of_class: current.toISOString() });
//             }

//             current = current.add(repeatEvery, "day");
//             count++;
//         }
//     }


//     return occurrences;
// };

// // Utility: categorize occurrences into today / thisWeek / nextWeek / nextMonth / nextYear
// const categorizeOccurrences = (occurrences: Occurrence[]): ClassCategories => {
//     const today = dayjs().startOf("day");

//     const startOfThisWeek = today.startOf("isoWeek");
//     const endOfThisWeek = today.endOf("isoWeek");

//     const startOfNextWeek = endOfThisWeek.add(1, "day").startOf("isoWeek");
//     const endOfNextWeek = startOfNextWeek.endOf("isoWeek");

//     const startOfNextMonth = today.add(1, "month").startOf("month");
//     const endOfNextMonth = today.add(1, "month").endOf("month");

//     const startOfNextYear = today.add(1, "year").startOf("year");
//     const endOfNextYear = today.add(1, "year").endOf("year");

//     const result: ClassCategories = {
//         today: [],
//         thisWeek: [],
//         nextWeek: [],
//         nextMonth: [],
//         nextYear: []
//     };

//     for (const occ of occurrences) {
//         const occDate = dayjs(occ.date_of_class);

//         if (occDate.isSame(today, "day")) {
//             result.today.push(occ);
//         } else if (occDate.isAfter(today) && (occDate.isSame(startOfThisWeek) || occDate.isAfter(startOfThisWeek)) && occDate.isBefore(endOfThisWeek.add(1, 'day'))) {
//             result.thisWeek.push(occ);
//         } else if (occDate.isAfter(startOfNextWeek.subtract(1, 'day')) && occDate.isBefore(endOfNextWeek.add(1, 'day'))) {
//             result.nextWeek.push(occ);
//         } else if (occDate.isAfter(startOfNextMonth.subtract(1, 'day')) && occDate.isBefore(endOfNextMonth.add(1, 'day'))) {
//             result.nextMonth.push(occ);
//         } else if (occDate.isAfter(startOfNextYear.subtract(1, 'day')) && occDate.isBefore(endOfNextYear.add(1, 'day'))) {
//             result.nextYear.push(occ);
//         }
//     }

//     return result;
// };

// // Main function: get classes by clubId
// export const getClassesByClubId = async (clubId: string): Promise<ClassCategories> => {
//     const classes = await Class.find(
//         { club: clubId },
//         "date_of_class duration start_time reoccurring_class club creator class_status const_per_ticket max_number_of_attendees class_name"
//     ).lean();

//     const allOccurrences: Occurrence[] = [];
//     for (const cls of classes) {
//         const occurrences = generateOccurrences(cls);
//         allOccurrences.push(...occurrences);
//     }

//     return categorizeOccurrences(allOccurrences);
// };
