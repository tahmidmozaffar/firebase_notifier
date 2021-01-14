import axios from 'axios';
import { PushNotificationObject } from '../screens/NotificationForm/types';
import { Events, logEvent } from '../services/logger';
import { useSessionStorage } from '../services/hooks/useSessionStorage';
import { Keys } from '../services/hooks/Keys';
import { NotificationObject, Project, PushNotification, User } from './types';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const signUp = async (accountName: string): Promise<{ success: boolean, message?: string }> => {
  const db = firebase.firestore();
  const documentData = await db.collection(accountName).doc('projects').get();
  if (documentData.exists) {
    return {
      success: false,
      message: 'Account name is not available. Please choose a different account name.',
    };
  } else {
    db.collection(accountName).doc('projects').set({ projectsArray: [] });
    return { success: true, 'message': 'Account is created successfully' };
  }
};

export const signIn = async (accountName: string): Promise<{ success: boolean, message?: string }> => {

  const db = firebase.firestore();
  const documentData = await db.collection(accountName).doc('projects').get();
  if (documentData.exists) {
    return { success: true };
  } else {
    return {
      success: false,
      message: 'Account does not exist. Please signup first.',
    };
  }
};

export const sendMessage = (serverKey: string | null,
                            users: User[], pushObject:
                              PushNotificationObject): Promise<void> => {

  const deviceTokenArray: string[] = [];
  users.forEach((user) => {
    deviceTokenArray.push(user.deviceToken);
  });

  const notificationObject: NotificationObject = {
    registration_ids: deviceTokenArray,
  };

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

  return axios.post('https://fcm.googleapis.com/fcm/send', notificationObject, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `key=${serverKey}`,
    },
  });

};

export const addProject = (accountName: string, project: Project, callback: (err?: Error) => void) => {

  const { getSessionItem, setSessionItem } = useSessionStorage();
  const projects = JSON.parse(getSessionItem(Keys.allProjects));
  const modifiedProjectList = projects.concat(project);
  setSessionItem(Keys.allProjects, JSON.stringify(modifiedProjectList));

  const db = firebase.firestore();
  db.collection(accountName).doc('projects')
    .set({ projectsArray: modifiedProjectList }).then(() => {
    callback();
  }).catch((err) => {
    callback(err);
  });
};

export const deleteProject = (accountName: string, projectId: string, modifiedProjects: Project[], callback: (err?: Error) => void) => {

  const { setSessionItem } = useSessionStorage();

  const db = firebase.firestore();
  db.collection(accountName).doc('projects')
    .set({ projectsArray: modifiedProjects }).then(() => {
    db.collection(accountName).doc(projectId).delete().then(() => {
      callback();
      setSessionItem(Keys.allProjects, JSON.stringify(modifiedProjects));
    }).catch((err) => {
      callback(err);
    });
  }).catch((err) => {
    callback(err);
  });

};

export const getProjects = (accountName: string, callback: (projects: Project[], err?: Error) => void) => {

  const { setSessionItem, getSessionItem } = useSessionStorage();
  const allProjects = getSessionItem(Keys.allProjects);

  const projects: Project[] = allProjects ? JSON.parse(allProjects) : [];

  if (projects.length > 0) {
    callback(projects);
    return;
  }

  const db = firebase.firestore();
  db.collection(accountName).doc('projects').get()
    .then((doc) => {

      const projects = doc.data()?.['projectsArray'] ?? [];
      setSessionItem(Keys.allProjects, JSON.stringify(projects));
      callback(projects);
    }).catch((err) => callback([], err));
};

export const addNotification = (accountName: string, projectId: string, notification: PushNotification) => {

  const { getSessionItem, setSessionItem } = useSessionStorage();
  const notificationsOfProject = getSessionItem(projectId);
  const allNotifications = notificationsOfProject
    ? JSON.parse(notificationsOfProject)
    : [];
  const modifiedNotificationList = [notification].concat(allNotifications);
  setSessionItem(projectId, JSON.stringify(modifiedNotificationList));

  const db = firebase.firestore();
  db.collection(accountName)
    .doc(projectId)
    .set({ notificationArray: modifiedNotificationList })
    .catch(() => {
      logEvent(Events.History_Add_Failure);
    });
};

export const getNotifications = (accountName: string, projectId: string, callback: (notifications: PushNotification[], err?: Error) => void) => {

  const { setSessionItem, getSessionItem } = useSessionStorage();
  const allNotificationOfProject = getSessionItem(projectId);
  const allNotifications: PushNotification[] = allNotificationOfProject
    ? JSON.parse(allNotificationOfProject)
    : [];

  if (allNotifications.length > 0) {
    callback(allNotifications);
    return;
  }

  const db = firebase.firestore();
  db.collection(accountName).doc(projectId).get()
    .then((doc) => {

      const notifications = doc.data()?.['notificationArray'] ?? [];
      notifications.sort(function (a, b) {
        return b.datetime - a.datetime;
      });
      setSessionItem(projectId, JSON.stringify(notifications));
      callback(notifications);
    }).catch((err) => callback([], err));

};
