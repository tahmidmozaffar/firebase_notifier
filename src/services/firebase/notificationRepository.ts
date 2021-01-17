import firebase from 'firebase/app';
import 'firebase/firestore';
import { useSessionStorage } from '../../services/hooks/useSessionStorage';
import { Events, logEvent } from '../../services/logger';
import { PushNotification } from '../../services/types';

export const addNotification = (userId: string, projectId: string, notification: PushNotification) => {

  if (projectId) {
    const { getSessionItem, setSessionItem } = useSessionStorage();
    const notificationsOfProject = getSessionItem(projectId);
    const allNotifications = notificationsOfProject
      ? JSON.parse(notificationsOfProject)
      : [];
    const modifiedNotificationList = [notification].concat(allNotifications);
    setSessionItem(projectId, JSON.stringify(modifiedNotificationList));

    const db = firebase.firestore();
    db.collection(userId)
      .doc(projectId)
      .set({ notificationArray: modifiedNotificationList })
      .catch(() => {
        logEvent(Events.History_Add_Failure);
      });
  }
};

export const getNotifications = (userId: string, projectId: string, callback: (notifications: PushNotification[], err?: Error) => void) => {

  if (projectId) {
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
    db.collection(userId).doc(projectId).get()
      .then((doc) => {

        const notifications = doc.data()?.['notificationArray'] ?? [];
        notifications.sort(function (a, b) {
          return b.datetime - a.datetime;
        });
        setSessionItem(projectId, JSON.stringify(notifications));
        callback(notifications);
      }).catch((err) => callback([], err));
  }
};
