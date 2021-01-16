import axios from 'axios';
import { PushNotificationObject } from '../../screens/NotificationForm/types';
import { NotificationObject, User } from '../../services/types';

type NotificationResponse = {
  failure: number;
}

export const sendMessage = (
  serverKey: string | null,
  users: User[],
  pushObject: PushNotificationObject,
  callback: (response: NotificationResponse) => void) => {

  const deviceTokenArray: string[] = [];
  users.forEach((user) => {
    deviceTokenArray.push(user.deviceToken);
  });

  const notificationObject: NotificationObject = {
    registration_ids: deviceTokenArray,
  };/**/
  postNotification(pushObject,notificationObject,serverKey,callback);
};

export const sendMessageToTopic = (
  serverKey: string | null,
  topic: string,
  pushObject: PushNotificationObject,
  callback: (response: NotificationResponse) => void) => {

  const notificationObject: NotificationObject = {};
  notificationObject.to = `/topics/${topic}`;

  postNotification(pushObject, notificationObject, serverKey, callback);
};

const postNotification = (
  pushObject: PushNotificationObject,
  notificationObject: NotificationObject,
  serverKey: string | null,
  callback: (response: NotificationResponse) => void,
) => {

  if (pushObject.title.length > 0 || pushObject.message.length > 0) {
    notificationObject.notification = {
      title: pushObject.title,
      body: pushObject.message,
    };
  }

  if (pushObject.imageUrl && pushObject.imageUrl.length > 0) {
    notificationObject.android = {
      notification: {
        image: pushObject.imageUrl,
      },
    };
  }

  if (Object.keys(pushObject.dataPartObject).length > 0) {
    Object.values(pushObject.dataPartObject).map((item) => {
      notificationObject.data = {
        ...notificationObject.data,
        [item.key]: item.value,
      };
    });
  }

  axios.post('https://fcm.googleapis.com/fcm/send', notificationObject, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${serverKey}`,
    },
  }).then((res) => {
    callback({ failure: res.data.failure });
  }).catch((err) => {
    console.log(err);
    callback({ failure: -1 });
  });
};
