import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import { Club } from '../club/club.model';
import { User } from '../user/user.model';
import { CLASS_ROLE, MEMBERS_STATUS, REPEAT_TYPE, REPEAT_UNTIL } from './class.constant';
import { IClass } from './class.interface';
import { Class } from './class.model';

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
    if (!repeat_every) throw new Error('Repeat every is require');
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

// reoccurring_class: {
//     repeat: REPEAT_TYPE; // repeat type
//     repeat_every: number; //repeat time
//     repeat_days_of_week: (DAY_OF_WEEK)[]; //if select weekly || yearlly
//     day_of_month: number; // if select repeat montyley
//     repeat_until ?: REPEAT_UNTIL; // ex: forever
//     total_occurrences ?: number // If select after_occurences
//     repeat_untilDate ?: Date // If select until_date // ISO date string: "YYYY-MM-DD"
// },

export const ClassService = {
    createClass,
};
