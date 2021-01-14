import { DataPart, User } from '../../services/types';

export type UsersObject = {
  [key: string]: User;
}

export type PushNotificationObject = {
  title: string,
  message: string;
  imageUrl?: string;
  dataPartObject: {
    [key: string]: DataPart;
  }
}

export type UserInfoFields = 'firebaseUid' | 'deviceToken';

export type DataPartFields = 'key' | 'value';
