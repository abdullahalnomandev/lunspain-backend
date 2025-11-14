import { Types } from 'mongoose';
import { Notification } from '../app/modules/notification/notification.mode';

interface INotification {
  receiver: string;
  sender: string;
  title: string;
  refId: Types.ObjectId | string;
  path: string;
  deleteReferenceId?: Types.ObjectId | string;
}
export const sendNotification = ( condition: boolean,{ receiver, sender, title, refId, path, deleteReferenceId }: INotification) => {
  if (condition && receiver.toString() !== sender.toString()) {
    const payload: any = {
      receiver,
      sender,
      title,
      refId,
      path,
    };

    if (deleteReferenceId) {
      payload.deleteReferenceId = deleteReferenceId;
    }

    Notification.create(payload);
  }
};
