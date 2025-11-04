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

    const isClubExist = await Club.findById(payload.club).lean('_id');
    if (!isClubExist) {
        throw new Error('Club id not correct!');
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

    if (repeat_until === REPEAT_UNTIL.UNTIL_DATE && !repeat_untilDate) throw new Error('Repeat until Date is require');
    else delete payload.reoccurring_class.total_occurrences

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
// Utility: generate occurrences for a single class
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


    return occurrences;
};

// Utility: categorize occurrences into today / thisWeek / nextWeek / nextMonth / nextYear
const categorizeOccurrences = (occurrences: Occurrence[]): ClassCategories => {
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
export const getClassesByClubId = async (clubId: string): Promise<ClassCategories> => {
    const classes = await Class.find(
        { club: clubId },
        "date_of_class duration start_time reoccurring_class club creator class_status const_per_ticket max_number_of_attendees class_name"
    ).lean();

    const allOccurrences: Occurrence[] = [];
    for (const cls of classes) {
        const occurrences = generateOccurrences(cls);
        allOccurrences.push(...occurrences);
    }

    return categorizeOccurrences(allOccurrences);
};


export const ClassService = {
    createClass,
    getClassesByClubId
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

