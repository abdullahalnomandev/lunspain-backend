import { model, Schema } from 'mongoose';
import {
  NOTIFICAITON_TOGGLE,
  NOTIFICATION_OPTION,
} from './notification_settings.constant';
import {
  ClubNotificationSettingsModel,
  IClubNotificationSettings,
} from './notification_settings.interface';

export const clubNotificationSettingsSchema = new Schema<
  IClubNotificationSettings,
  ClubNotificationSettingsModel
>({
  likes_on_your_posts: {
    type: String,
    enum: NOTIFICATION_OPTION,
    default: NOTIFICATION_OPTION.FROM_PROFILES_I_FOLLOW,
  },
  comments_on_your_posts: {
    type: String,
    enum: NOTIFICATION_OPTION,
    default: NOTIFICATION_OPTION.FROM_PROFILES_I_FOLLOW,
  },
  like_and_comments_on_tagged_posts: {
    type: String,
    enum: NOTIFICATION_OPTION,
    default: NOTIFICATION_OPTION.FROM_PROFILES_I_FOLLOW,
  },
  new_followers: {
    type: Boolean,
    default: NOTIFICAITON_TOGGLE.ON,
  },
  accept_follow_requests: {
    type: Boolean,
    default: NOTIFICAITON_TOGGLE.OFF,
  },
  message_requests: {
    type: Boolean,
    default: NOTIFICAITON_TOGGLE.ON,
  },
  club_community_messages: {
    type: Boolean,
    default: NOTIFICAITON_TOGGLE.ON,
  },
  club_cander_booking: {
    type: Boolean,
    default: NOTIFICAITON_TOGGLE.ON,
  },
  birthday_reminders: {
    type: Boolean,
    default: NOTIFICAITON_TOGGLE.ON,
  },
});

export const ClubNotificationSettings = model<
  IClubNotificationSettings,
  ClubNotificationSettingsModel
>('ClubNotificationSettings', clubNotificationSettingsSchema);
