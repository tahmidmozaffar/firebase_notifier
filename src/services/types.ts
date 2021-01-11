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
  message: string;
}
