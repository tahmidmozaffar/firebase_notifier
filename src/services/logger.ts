import amplitude from 'amplitude-js';
import * as configs from '../configs.json';

export const loggerInit = () => {
  amplitude.getInstance().init(configs.amplitudeId);
};

export const logEvent = (eventName: string) => {
  amplitude.getInstance().logEvent(eventName);
};

export const Events = {
  Signup: 'signup',
  Signup_Failed: 'signup_failed',
  Login: 'login',
  Login_Failed: 'login_failed',
  Project_Added: 'project_added',
  Project_Deleted: 'project_deleted',
  Failed_Add_Project: 'failed_add_project',
  Project_Load_Failed: 'project_load_failed',
  Notification_Sent: 'notification_sent',
  Notification_Send_Failure: 'notification_send_failure',
  History_Add_Failure: 'history_add_failure',
  History_Load_Failed: 'history_load_failed',
};
