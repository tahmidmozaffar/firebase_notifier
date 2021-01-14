import { PushNotificationObject } from '../screens/NotificationForm/types';

export type User = {
  id: number;
  firebaseUid: string;
  deviceToken: string;
}

export type Project = {
  id: string;
  projectName: string;
  serverKey: string;
}

export type PushNotification = {
  id: string;
  datetime: number;
  userId: string;
  message?: string;
  notification: PushNotificationObject;
}

export type DataPart = {
  id: number;
  key: string;
  value: string;
}

export type NotificationObject = {
  registration_ids: string[],
  notification?: {
    title: string,
    body: string,
  }
  data?: {
    [key: string]: string
  },
  android?: {
    notification: {
      image: string
    }
  }
}

