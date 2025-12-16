import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import QueryBuilder from '../../builder/QueryBuilder';
import { Notification } from './notification.mode';

const getMyNotifications = async (userId: string, query: Record<string, any>) => {
  const notificationQuery = new QueryBuilder(
    Notification.find({ receiver: userId },'-deleteReferenceId'),
    query
  )
    .paginate()
    .fields()
    .filter()
    .sort();

  const notifications = await notificationQuery.modelQuery.populate('sender', 'profile.username profile.image').lean();

  const unreadCount = await Notification.countDocuments({ recipient: userId, seen: false });

  const pagination = await notificationQuery.getPaginationInfo();

  return {
    data: notifications,
    pagination,
    unreadCount,
  };
};

const getClubNOtifications = async (clubId: string, query: Record<string, any>) => {
  const notificationQuery = new QueryBuilder(
    Notification.find({ receiver_club: clubId },'-deleteReferenceId'),
    query
  )
    .paginate()
    .fields()
    .filter()
    .sort();

  const notifications = await notificationQuery.modelQuery.populate('sender', 'profile.username profile.image').lean();
  const unreadCount = await Notification.countDocuments({ recipient: clubId, seen: false });
  const pagination = await notificationQuery.getPaginationInfo();

  return {
    data: notifications,
    pagination,
    unreadCount,
  };
};

// const getClubNOtifications = async (clubId: string, query: Record<string, any>) => {
//   const notificationQuery = new QueryBuilder(
//     Notification.find({ receiver_club: clubId }, '-deleteReferenceId'),
//     query
//   )
//     .paginate()
//     .fields()
//     .filter()
//     .sort();

//   const notifications = await notificationQuery.modelQuery
//     .populate('sender', 'profile.username profile.image')
//     .lean();

//   const unreadCount = await Notification.countDocuments({ receiver_club: clubId, seen: false });
//   const pagination = await notificationQuery.getPaginationInfo();

//   // Group notifications by category
//   const now = new Date();

//   // Helper functions for date grouping
//   function getGroupKey(date: Date) {
//     const notifDate = new Date(date);
//     const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const notifDay = new Date(notifDate.getFullYear(), notifDate.getMonth(), notifDate.getDate());

//     const diffTime = today.getTime() - notifDay.getTime();
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) return 'Today';
//     if (diffDays === 1) return 'Yesterday';
//     if (diffDays === 2) return '2 days ago';

//     // Month/year group
//     if (now.getFullYear() === notifDate.getFullYear() && now.getMonth() === notifDate.getMonth()) {
//       // Already handled today/yesterday group
//       // If more than 2 days in this month, bucket as "This Month"
//       return 'Earlier this month';
//     }

//     // Same year, previous month(s)
//     if (now.getFullYear() === notifDate.getFullYear()) {
//       return notifDate.toLocaleString('default', { month: 'long', year: 'numeric' });
//     }
//     // Previous years
//     return notifDate.toLocaleString('default', { month: 'long', year: 'numeric' });
//   }

//   // Group notifications by key
//   const grouped: Record<string, any[]> = {};
//   notifications.forEach(notification => {
//     const key = getGroupKey(notification.createdAt || notification.updatedAt || notification.date);
//     if (!grouped[key]) grouped[key] = [];
//     grouped[key].push(notification);
//   });

//   // Build final sorted sections: today, yesterday, 2 days ago, this month, then previous months sorted descending
//   const order: string[] = [];
//   if (grouped['Today']) order.push('Today');
//   if (grouped['Yesterday']) order.push('Yesterday');
//   if (grouped['2 days ago']) order.push('2 days ago');
//   if (grouped['Earlier this month']) order.push('Earlier this month');

//   // Get all remaining keys (month-year), sorted from recent to old
//   const monthYearKeys = Object.keys(grouped).filter(
//     key => !order.includes(key)
//   );
//   const parseMonthYear = (k: string) => {
//     // "December 2024" case
//     const parts = k.split(' ');
//     if (parts.length < 2) return {year: 0, month: 0};
//     const month = new Date(Date.parse(parts[0] +" 1, 2000")).getMonth();
//     const year = parseInt(parts[1], 10);
//     return { year, month };
//   };
//   monthYearKeys.sort((a, b) => {
//     const pA = parseMonthYear(a);
//     const pB = parseMonthYear(b);
//     if (pA.year !== pB.year) return pB.year - pA.year;
//     return pB.month - pA.month;
//   });
//   order.push(...monthYearKeys);

//   // Build result array
//   const groupedNotifications = order.map(title => ({
//     title,
//     notifications: grouped[title]
//   }));

//   return {
//     data: groupedNotifications,
//     pagination,
//     unreadCount,
//   };
// };


const markAsSeen = async (userId: string, notificationId: string) => {
  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    { seen: true },
    { new: true }
  ).lean();

  if (!notification) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Notification not found or access denied');
  }
  

  return notification;
};

export const NotificationService = {
  getMyNotifications,
  markAsSeen,
  getClubNOtifications
};
