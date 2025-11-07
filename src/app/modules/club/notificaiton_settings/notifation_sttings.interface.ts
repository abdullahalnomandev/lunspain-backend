import { Model } from 'mongoose';
import { NOTIFICAITON_TOGGLE } from './notification_settings.constant';

export type IClubNotificationSettings = {
  likes_on_your_posts: NOTIFICATION_OPTION;
  comments_on_your_posts: NOTIFICATION_OPTION;
  like_and_comments_on_tagged_posts: NOTIFICATION_OPTION;
  new_followers: NOTIFICAITON_TOGGLE;
  accept_follow_requests: NOTIFICAITON_TOGGLE;
  message_requests: NOTIFICAITON_TOGGLE;
  club_community_messages: NOTIFICAITON_TOGGLE;
  club_cander_booking: NOTIFICAITON_TOGGLE;
  birthday_reminders: NOTIFICAITON_TOGGLE;
};

export type ClubNotificationSettingsModel = Model<
  IClubNotificationSettings,
  Record<string, unknown>
>;
