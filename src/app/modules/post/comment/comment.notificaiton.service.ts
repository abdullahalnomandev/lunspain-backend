import { Types } from 'mongoose';
import { sendNotification } from '../../../../shared/sendNotification';
import { Follower } from '../../user/follower/follower.model';
import { IUserNotificationSettings } from '../../user/notificaiton_settings/notifation_sttings.interface';
import { NOTIFICATION_OPTION } from '../../user/notificaiton_settings/notification_settings.constant';
import { User } from '../../user/user.model';

interface IProps {
  sender: string;
  refId: string;
  deleteReferenceId: string | Types.ObjectId;
  receiver: string;
}

export const createNotification = async ({
  sender,
  refId,
  deleteReferenceId,
  receiver,
}: IProps) => {

  const userNotificationSettings = await User.findById( receiver, '-_id notification_settings' ).populate('notification_settings').lean();
  const { comments_on_your_posts } = userNotificationSettings?.notification_settings as IUserNotificationSettings;

  const conditions = [
    comments_on_your_posts === NOTIFICATION_OPTION.FROM_EVERYONE,
    comments_on_your_posts === NOTIFICATION_OPTION.FROM_PROFILES_I_FOLLOW &&!!(await Follower.exists({following: sender,follower: receiver})
    .lean()),
  ];

  conditions.map(condition => {
    console.log({condition})
    if (condition) {
      sendNotification(condition, {
        receiver,
        sender,
        title: 'Comment on your post',
        refId,
        deleteReferenceId,
        path: '/user/post/comment',
      });
    }
  });

};
