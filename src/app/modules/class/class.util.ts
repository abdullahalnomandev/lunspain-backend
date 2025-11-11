import dayjs from "dayjs";
import { Occurrence } from "./class.service";
import { BookingClass } from "../bookingClass/bookingClass.model";
import { MEMBERS_STATUS } from "./class.constant";

export function getDayIndex(dayName: string) {
    const map = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
    };
    return (map as Record<string, number>)[dayName.toLowerCase()] ?? 0;
}


export const categorizeOccurrences = async (
    occurrences: Occurrence[],
    userId: string
): Promise<{
    today: Occurrence[];
    thisWeek: Occurrence[];
    nextWeek: Occurrence[];
    afterNextWeek: Occurrence[];
}> => {
    const today = dayjs().startOf("day");

    // Only keep the needed date ranges
    const endOfThisWeek = today.endOf("isoWeek");

    const startOfNextWeek = endOfThisWeek.add(1, "day").startOf("isoWeek");
    const endOfNextWeek = startOfNextWeek.endOf("isoWeek");

    const result = {
        today: [] as Occurrence[],
        thisWeek: [] as Occurrence[],
        nextWeek: [] as Occurrence[],
        afterNextWeek: [] as Occurrence[],
    };

    for (const occ of occurrences) {
        const bookingRefId = `${occ.date_of_class.split("T")[0]}_${occ._id}`;

        const [totalBooked, isMyBooked, isCanceled] = await Promise.all([
            BookingClass.countDocuments({
                club: occ.club,
                class: occ._id,
                attandence_status: MEMBERS_STATUS.ATTEND,
                class_booking_ref_id: bookingRefId,
            }),
            BookingClass.exists({
                club: occ.club,
                user: userId,
                class: occ._id,
                attandence_status: MEMBERS_STATUS.ATTEND,
                class_booking_ref_id: bookingRefId,
            }),
            BookingClass.exists({
                club: occ.club,
                user: userId,
                class: occ._id,
                attandence_status: MEMBERS_STATUS.CANCEL,
                class_booking_ref_id: bookingRefId,
            }),
        ]);

        // ✅ Remaining seats
        // @ts-ignore
        occ.remaining_space = occ.max_number_of_attendees - totalBooked;

        if (isMyBooked) {
            occ.booking_status = "attended";
        } else if (isCanceled) {
            occ.booking_status = "canceled";
        } else {
            occ.booking_status =
                totalBooked >= occ.max_number_of_attendees ? "full" : "available";
        }

        const occDate = dayjs(occ.date_of_class);

        if (occDate.isSame(today, "day")) {
            result.today.push(occ);
        } else if (
            occDate.isAfter(today) &&
            occDate.isBefore(endOfThisWeek.add(1, "day"))
        ) {
            result.thisWeek.push(occ);
        } else if (
            occDate.isAfter(endOfThisWeek) &&
            occDate.isBefore(endOfNextWeek.add(1, "day"))
        ) {
            result.nextWeek.push(occ);
        } else if (occDate.isAfter(endOfNextWeek)) {
            result.afterNextWeek.push(occ);
        }
    }

    return result;
};
