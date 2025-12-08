import dayjs from 'dayjs';
import { BookingClass } from '../bookingClass/bookingClass.model';
import { MEMBERS_STATUS } from './class.constant';
import { Occurrence } from './class.service';
import { ClassStatus } from './class_status/class_status.model';

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

// export const categorizeOccurrences = async (
//     occurrences: Occurrence[],
//     userId: string
// ): Promise<{
//     today: Occurrence[];
//     thisWeek: Occurrence[];
//     nextWeek: Occurrence[];
//     afterNextWeek: Occurrence[];
// }> => {
//     const today = dayjs().startOf("day");

//     // Only keep the needed date ranges
//     const endOfThisWeek = today.endOf("isoWeek");

//     const startOfNextWeek = endOfThisWeek.add(1, "day").startOf("isoWeek");
//     const endOfNextWeek = startOfNextWeek.endOf("isoWeek");

//     const result = {
//         today: [] as Occurrence[],
//         thisWeek: [] as Occurrence[],
//         nextWeek: [] as Occurrence[],
//         afterNextWeek: [] as Occurrence[],
//     };

//     for (const occ of occurrences) {

//         const bookingRefId = `${occ.date_of_class.split("T")[0]}_${occ._id}`;
//         //
//         const [totalBooked, isMyBooked, isCanceled, getStatus] = await Promise.all([
//             BookingClass.countDocuments({
//                 club: occ.club,
//                 class: occ._id,
//                 attandence_status: MEMBERS_STATUS.ATTEND,
//                 class_booking_ref_id: bookingRefId,
//             }).lean(),
//             BookingClass.exists({
//                 club: occ.club,
//                 user: userId,
//                 class: occ._id,
//                 attandence_status: MEMBERS_STATUS.ATTEND,
//                 class_booking_ref_id: bookingRefId,
//             }).lean(),
//             BookingClass.exists({
//                 club: occ.club,
//                 user: userId,
//                 class: occ._id,
//                 attandence_status: MEMBERS_STATUS.CANCEL,
//                 class_booking_ref_id: bookingRefId,
//             }),
//             ClassStatus.findOne({ class_booking_ref_id: bookingRefId }).lean()
//         ]);

//         const isLeader = Array.isArray(occ.class_mnamagers) ? !!occ.class_mnamagers.find((user: any) => user?.toString() === userId.toString()) : false;

//         console.log(isLeader)

//         if (!isLeader && getStatus && !getStatus?.is_visiable) {
//             continue;
//         }

//         // ✅ Remaining seats
//         // @ts-ignore
//         occ.remaining_space = occ.max_number_of_attendees - totalBooked;

//         if (isMyBooked) {
//             occ.booking_status = "attended";
//         } else if (isCanceled) {
//             occ.booking_status = "canceled";
//         } else {
//             occ.booking_status =
//                 totalBooked >= occ.max_number_of_attendees ? "full" : "available";
//         }

//         const occDate = dayjs(occ.date_of_class);

//         if (occDate.isSame(today, "day")) {
//             result.today.push(occ);
//         } else if (
//             occDate.isAfter(today) &&
//             occDate.isBefore(endOfThisWeek.add(1, "day"))
//         ) {
//             result.thisWeek.push(occ);
//         } else if (
//             occDate.isAfter(endOfThisWeek) &&
//             occDate.isBefore(endOfNextWeek.add(1, "day"))
//         ) {
//             result.nextWeek.push(occ);
//         } else if (occDate.isAfter(endOfNextWeek)) {
//             result.afterNextWeek.push(occ);
//         }
//     }

//     return result;
// };

export const categorizeOccurrences = async (
  occurrences: Occurrence[],
  userId: string
): Promise<{
  today: Occurrence[];
  thisWeek: Occurrence[];
  nextWeek: Occurrence[];
  afterNextWeek: Occurrence[];
}> => {
  const today = dayjs().startOf('day');
  const endOfThisWeek = today.endOf('isoWeek');
  const startOfNextWeek = endOfThisWeek.add(1, 'day').startOf('isoWeek');
  const endOfNextWeek = startOfNextWeek.endOf('isoWeek');

  const result = {
    today: [] as Occurrence[],
    thisWeek: [] as Occurrence[],
    nextWeek: [] as Occurrence[],
    afterNextWeek: [] as Occurrence[],
  };

  // ✅ Step 1: Prepare bookingRefIds
  const bookingRefIds = occurrences.map(
    occ => `${occ.date_of_class.split('T')[0]}_${occ._id}`
  );

  // ✅ Step 2: Preload all bookings & statuses in one go
  const [bookedCounts, userBookings, userCancellations, classStatuses] =
    await Promise.all([
      // Group count per class_booking_ref_id
      BookingClass.aggregate([
        {
          $match: {
            attandence_status: MEMBERS_STATUS.ATTEND,
            class_booking_ref_id: { $in: bookingRefIds },
          },
        },
        {
          $group: {
            _id: '$class_booking_ref_id',
            count: { $sum: 1 },
          },
        },
      ]),
      BookingClass.find({
        user: userId,
        attandence_status: MEMBERS_STATUS.ATTEND,
        class_booking_ref_id: { $in: bookingRefIds },
      })
        .select('class_booking_ref_id')
        .lean(),

      BookingClass.find({
        user: userId,
        attandence_status: MEMBERS_STATUS.CANCEL,
        class_booking_ref_id: { $in: bookingRefIds },
      })
        .select('class_booking_ref_id')
        .lean(),

      ClassStatus.find({
        class_booking_ref_id: { $in: bookingRefIds },
      }).lean(),
    ]);

  // ✅ Step 3: Convert to maps for O(1) lookup
  const bookedCountMap = Object.fromEntries(
    bookedCounts.map(b => [b._id, b.count])
  );
  const bookedSet = new Set(userBookings.map(b => b.class_booking_ref_id));
  const canceledSet = new Set(
    userCancellations.map(b => b.class_booking_ref_id)
  );
  const statusMap = Object.fromEntries(
    classStatuses.map(s => [s.class_booking_ref_id, s])
  );

  // ✅ Step 4: Loop & categorize without DB hits
  for (const occ of occurrences) {
    const bookingRefId = `${occ.date_of_class.split('T')[0]}_${occ._id}`;

    const totalBooked = bookedCountMap[bookingRefId] || 0;
    const isMyBooked = bookedSet.has(bookingRefId);
    const isCanceled = canceledSet.has(bookingRefId);
    const getStatus = statusMap[bookingRefId];

    const isLeader = Array.isArray(occ.class_mnamagers)
      ? !!occ.class_mnamagers.find(
          (user: any) => user?.toString() === userId.toString()
        )
      : false;

    if (!isLeader && getStatus && !getStatus?.is_visiable) continue;

    occ.remaining_space = occ.max_number_of_attendees - totalBooked;

     console.log('occ',occ)
    if (isMyBooked) occ.booking_status = 'attended';
    else if (isCanceled) occ.booking_status = 'canceled';
    else
      occ.booking_status =
        totalBooked >= occ.max_number_of_attendees ? 'full' : 'available';

    const occDate = dayjs(occ.date_of_class);

    if (occDate.isSame(today, 'day')) result.today.push(occ);
    else if (
      occDate.isAfter(today) &&
      occDate.isBefore(endOfThisWeek.add(1, 'day'))
    )
      result.thisWeek.push(occ);
    else if (
      occDate.isAfter(endOfThisWeek) &&
      occDate.isBefore(endOfNextWeek.add(1, 'day'))
    ) result.nextWeek.push(occ);
    
    
    else if (occDate.isAfter(endOfNextWeek)) result.afterNextWeek.push(occ);
  }

  // Sort each array by date_of_class ascending
  const sortByDateAsc = (array: Occurrence[]) =>
    array.sort((a, b) =>
      dayjs(a.date_of_class).isBefore(dayjs(b.date_of_class)) ? -1 : dayjs(a.date_of_class).isAfter(dayjs(b.date_of_class)) ? 1 : 0
    );

  // Filter out empty arrays from the result, and sort
  const filteredResult: any = {};
  if (result.today.length > 0) filteredResult.today = sortByDateAsc(result.today);
  if (result.thisWeek.length > 0) filteredResult.thisWeek = sortByDateAsc(result.thisWeek);
  if (result.nextWeek.length > 0) filteredResult.nextWeek = sortByDateAsc(result.nextWeek);
  if (result.afterNextWeek.length > 0)
    filteredResult.afterNextWeek = sortByDateAsc(result.afterNextWeek);


  return filteredResult;
};


// export const categorizeOccurrences = async (
//   occurrences: Occurrence[],
//   userId: string
// ): Promise<{
//   past: Occurrence[];
//   today: Occurrence[];
//   thisWeek: Occurrence[];
//   nextWeek: Occurrence[];
//   afterNextWeek: Occurrence[];
// }> => {

//   const today = dayjs().startOf('day');
//   const endOfThisWeek = today.endOf('isoWeek');
//   const startOfNextWeek = endOfThisWeek.add(1, 'day').startOf('isoWeek');
//   const endOfNextWeek = startOfNextWeek.endOf('isoWeek');

//   const result = {
//     past: [] as Occurrence[],
//     today: [] as Occurrence[],
//     thisWeek: [] as Occurrence[],
//     nextWeek: [] as Occurrence[],
//     afterNextWeek: [] as Occurrence[],
//   };

//   const bookingRefIds = occurrences.map(
//     occ => `${occ.date_of_class.split('T')[0]}_${occ._id}`
//   );

//   const [bookedCounts, userBookings, userCancellations, classStatuses] =
//     await Promise.all([
//       BookingClass.aggregate([
//         {
//           $match: {
//             attandence_status: MEMBERS_STATUS.ATTEND,
//             class_booking_ref_id: { $in: bookingRefIds },
//           },
//         },
//         {
//           $group: {
//             _id: '$class_booking_ref_id',
//             count: { $sum: 1 },
//           },
//         },
//       ]),

//       BookingClass.find({
//         user: userId,
//         attandence_status: MEMBERS_STATUS.ATTEND,
//         class_booking_ref_id: { $in: bookingRefIds },
//       })
//         .select('class_booking_ref_id')
//         .lean(),

//       BookingClass.find({
//         user: userId,
//         attandence_status: MEMBERS_STATUS.CANCEL,
//         class_booking_ref_id: { $in: bookingRefIds },
//       })
//         .select('class_booking_ref_id')
//         .lean(),

//       ClassStatus.find({
//         class_booking_ref_id: { $in: bookingRefIds },
//       }).lean(),
//     ]);

//   const bookedCountMap = Object.fromEntries(
//     bookedCounts.map(b => [b._id, b.count])
//   );

//   const bookedSet = new Set(userBookings.map(b => b.class_booking_ref_id));
//   const canceledSet = new Set(userCancellations.map(b => b.class_booking_ref_id));
//   const statusMap = Object.fromEntries(
//     classStatuses.map(s => [s.class_booking_ref_id, s])
//   );

//   for (const occ of occurrences) {

//     const bookingRefId = `${occ.date_of_class.split('T')[0]}_${occ._id}`;

//     const totalBooked = bookedCountMap[bookingRefId] || 0;
//     const isMyBooked = bookedSet.has(bookingRefId);
//     const isCanceled = canceledSet.has(bookingRefId);
//     const getStatus = statusMap[bookingRefId];

//     const isLeader = Array.isArray(occ.class_mnamagers)
//       ? !!occ.class_mnamagers.find(
//           (user: any) => user?.toString() === userId.toString()
//         )
//       : false;

//     if (!isLeader && getStatus && !getStatus?.is_visiable) continue;

//     occ.remaining_space = occ.max_number_of_attendees - totalBooked;

//     if (isMyBooked) occ.booking_status = "attended";
//     else if (isCanceled) occ.booking_status = "canceled";
//     else occ.booking_status =
//       totalBooked >= occ.max_number_of_attendees ? "full" : "available";

//     const occDate = dayjs(occ.date_of_class);

//     // ⭐ NEW LOGIC — include past events
//     if (occDate.isBefore(today, "day")) {
//       result.past.push(occ);
//     }
//     else if (occDate.isSame(today, "day")) {
//       result.today.push(occ);
//     }
//     else if (occDate.isAfter(today) && occDate.isBefore(endOfThisWeek.add(1, "day"))) {
//       result.thisWeek.push(occ);
//     }
//     else if (occDate.isAfter(endOfThisWeek) && occDate.isBefore(endOfNextWeek.add(1, "day"))) {
//       result.nextWeek.push(occ);
//     }
//     else if (occDate.isAfter(endOfNextWeek)) {
//       result.afterNextWeek.push(occ);
//     }
//   }

//   const sortByDateAsc = (array: Occurrence[]) =>
//     array.sort((a, b) =>
//       dayjs(a.date_of_class).isBefore(dayjs(b.date_of_class)) ? -1 :
//       dayjs(a.date_of_class).isAfter(dayjs(b.date_of_class)) ? 1 : 0
//     );

//   return {
//     past: sortByDateAsc(result.past),
//     today: sortByDateAsc(result.today),
//     thisWeek: sortByDateAsc(result.thisWeek),
//     nextWeek: sortByDateAsc(result.nextWeek),
//     afterNextWeek: sortByDateAsc(result.afterNextWeek),
//   };
// };
