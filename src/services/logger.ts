import amplitude from 'amplitude-js';
import * as configs from '../configs.json';

export const loggerInit = () => {
  if (process.env.NODE_ENV !== 'development') {
    amplitude.getInstance().init(configs.amplitudeId);
  }
};

export const logEvent = (eventName: string) => {
  if (process.env.NODE_ENV !== 'development') {
    amplitude.getInstance().logEvent(eventName);
  }
};

export const Events = {
  Login_Page: 'login_page',
  App_Opened: 'App_Opened',
  Signup: 'signup',
  Signup_Failed: 'signup_failed',
  Login: 'login',
  Login_Failed: 'login_failed',
  Project_Added: 'project_added',
  Project_Deleted: 'project_deleted',
  Failed_Add_Project: 'failed_add_project',
  Project_Load_Failed: 'project_load_failed',
  All_Notification_Sent: 'all_notification_sent',
  Some_Notification_Not_Sent: 'some_notifications_not_sent',
  Notification_Send_Failure: 'notification_send_failure',
  Notification_Send_Failure_topic: 'notification_send_failure_to_topic',
  History_Add_Failure: 'history_add_failure',
  History_Load_Failed: 'history_load_failed',
};
