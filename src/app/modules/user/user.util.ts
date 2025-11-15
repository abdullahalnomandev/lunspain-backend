import axios from "axios";
import setCronJob from "../../../shared/setCronJob";
import { User } from "./user.model";
import { IUserNotificationSettings } from "./notificaiton_settings/notifation_sttings.interface";
import { sendNotification } from "../../../shared/sendNotification";
import dayjs from "dayjs";
import { Notification } from "../notification/notification.mode";

export const getUserInfoWithToken = async (token: string) => {
  return await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAppleUserInfoWithToken = async (token: string) => {
  return await axios.get('https://appleid.apple.com/auth/userinfo', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};




export const sendBirthdayNotification = async () => {

  setCronJob(
        "* * * * *", // every minute
    //  "0 0 * * *", // every day at midnight
    async () => {
      
      const todayDay = dayjs().format("DD");   // e.g., "01"
      const todayMonth = dayjs().format("MM"); // e.g., "10"

      // Find users whose birthday matches today (ignore year)
      const usersWithBirthdayToday = await User.find({verified: true, "profile.date_of_birth": { $regex: `^${todayDay}/${todayMonth}` }}).lean();

      for (const user of usersWithBirthdayToday) {
        const userNotificationSettings = await User.findById(user._id, "-_id notification_settings")
          .populate("notification_settings")
          .lean();

        const isSent = await Notification.exists({
          receiver: user._id.toString(),
          sender: null,
          refId: user._id.toString(),
          path: "/system/birthday",
        });

        if (!userNotificationSettings || isSent) continue;

        const remainder = userNotificationSettings?.notification_settings as IUserNotificationSettings;
        const isSentAble = !!remainder?.birthday_reminders        
        // Send notification
        sendNotification(true, {
          receiver: user._id.toString(),
          sender: null,
          title: "🎉 Happy Birthday!",
          refId: user._id.toString(),
          path: "/system/birthday",
        });
      }
    },
    false
  );
};
