import { model, Schema } from "mongoose";
import { ClubNotificationSettingsModel, IClubNotificationSettings } from "./club_notifation_sttings.interface";
import { CLUB_NOTIFICATION_OPTION, CLUB_NOTIFICATION_TOGGLE } from "./club_notification_settings.constant";



export const clubNotificationSettingsSchema = new Schema<
  IClubNotificationSettings,
  ClubNotificationSettingsModel
>({
  likes_on_your_posts: {
    type: String,
    enum: Object.values(CLUB_NOTIFICATION_OPTION),
    default: CLUB_NOTIFICATION_OPTION.FROM_PROFILES_I_FOLLOW,
  },

  comments_on_your_posts: {
    type: String,
    enum: Object.values(CLUB_NOTIFICATION_OPTION),
    default: CLUB_NOTIFICATION_OPTION.FROM_PROFILES_I_FOLLOW,
  },

  like_and_comments_on_tagged_posts: {
    type: String,
    enum: Object.values(CLUB_NOTIFICATION_OPTION),
    default: CLUB_NOTIFICATION_OPTION.FROM_PROFILES_I_FOLLOW,
  },

  new_followers: {
    type: Boolean,
    default: true as CLUB_NOTIFICATION_TOGGLE,
  },

  accept_follow_requests: {
    type: Boolean,
    default: false as CLUB_NOTIFICATION_TOGGLE,
  },

  message_requests: {
    type: Boolean,
    default: true as CLUB_NOTIFICATION_TOGGLE,
  },

  club_community_messages: {
    type: Boolean,
    default: true as CLUB_NOTIFICATION_TOGGLE,
  },

  club_calendar_booking: {
    type: Boolean,
    default: true as CLUB_NOTIFICATION_TOGGLE,
  },

  birthday_reminders: {
    type: Boolean,
    default: true as CLUB_NOTIFICATION_TOGGLE,
  },
});

export const ClubNotificationSettings = model<IClubNotificationSettings>( "ClubNotificationSettings", clubNotificationSettingsSchema);
