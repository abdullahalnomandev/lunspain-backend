import { Model } from "mongoose";
import { CLUB_NOTIFICATION_OPTION, CLUB_NOTIFICATION_TOGGLE } from "./club_notification_settings.constant";

export type IClubNotificationSettings = {
  likes_on_your_posts: CLUB_NOTIFICATION_OPTION;
  comments_on_your_posts: CLUB_NOTIFICATION_OPTION;
  like_and_comments_on_tagged_posts: CLUB_NOTIFICATION_OPTION;

  new_followers: CLUB_NOTIFICATION_TOGGLE;
  accept_follow_requests: CLUB_NOTIFICATION_TOGGLE;
  message_requests: CLUB_NOTIFICATION_TOGGLE;
  club_community_messages: CLUB_NOTIFICATION_TOGGLE;
  club_calendar_booking: CLUB_NOTIFICATION_TOGGLE;
  birthday_reminders: CLUB_NOTIFICATION_TOGGLE;
};


export type ClubNotificationSettingsModel = Model<
  IClubNotificationSettings,
  Record<string, unknown>
>;
