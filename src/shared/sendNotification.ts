import { Types } from 'mongoose';
import { Notification } from '../app/modules/notification/notification.mode';
import admin from '../helpers/firebaseConfig';

interface INotification {
  receiver: string;
  sender: string | null;
  title: string;
  refId: Types.ObjectId | string;
  path: string;
  deleteReferenceId?: Types.ObjectId | string;
  fcmToken?: string;
  receiver_club?:Types.ObjectId | string;
}
export const sendNotification = (condition: boolean, { receiver, receiver_club, sender, title, refId, path, deleteReferenceId, fcmToken }: INotification) => {
  if (condition && receiver.toString() !== sender?.toString()) {
    const payload: any = {
      receiver,
      sender,
      title,
      refId,
      path 
    };

    if (deleteReferenceId) {
      payload.deleteReferenceId = deleteReferenceId;
    }
    if (receiver_club) {
      payload.receiver_club = receiver_club;
    }


    if (fcmToken) {
      // PUSH NOTIFICATION START --->
      const message = {
        token: fcmToken,
        notification: {
          title: title
        },
        data: {
          receiver: String(receiver),
          sender: sender ? String(sender) : '',
          title: String(title),
          refId: String(refId),
          deleteReferenceId: deleteReferenceId ? String(deleteReferenceId) : '',
          path: String(path),
        },
      };
      admin.messaging().send(message);
      // PUSH NOTIFICATION END --->
    }

    Notification.create(payload);
  }
};

export const sendClubNotification = (condition: boolean, { receiver, receiver_club, sender, title, refId, path, deleteReferenceId, fcmToken }: INotification) => {
  if (condition) {
    const payload: any = {
      receiver,
      sender,
      title,
      refId,
      path 
    };

    if (deleteReferenceId) {
      payload.deleteReferenceId = deleteReferenceId;
    }
    if (receiver_club) {
      payload.receiver_club = receiver_club;
    }


    if (fcmToken) {
      // PUSH NOTIFICATION START --->
      const message = {
        token: fcmToken,
        notification: {
          title: title
        },
        data: {
          receiver: String(receiver),
          sender: sender ? String(sender) : '',
          title: String(title),
          refId: String(refId),
          deleteReferenceId: deleteReferenceId ? String(deleteReferenceId) : '',
          path: String(path),
        },
      };
      admin.messaging().send(message);
      // PUSH NOTIFICATION END --->
    }

    Notification.create(payload);
  }
};
