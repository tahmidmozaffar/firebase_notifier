import { FormControlLabel, Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Routes } from '../../routes';
import { paletteColors } from '../../styles/palette';
import {
  sendMessage,
  sendMessageToTopic,
} from '../../services/firebase/messaging';
import {
  UsersObject,
  UserInfoFields,
  DataPartFields,
  PushNotificationObject,
} from './types';
import { Events, logEvent } from '../../services/logger';
import History from '../History';
import { HeaderBar } from '../../components/HeaderBar';
import { Keys } from '../../services/hooks/Keys';
import {
  addNotification,
  getNotifications,
} from '../../services/firebase/notificationRepository';
import { useLocalStorage } from '../../services/hooks/useLocalStorage';
import { DataPart, PushNotification, User } from '../../services/types';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  LeftContainer,
  SimpleButton,
} from '../../styles/commonStyles';
import { TokenContainer, InputBox } from './styles';

const NotificationForm = () => {
  const history = useHistory();
  const { getLocalItem } = useLocalStorage();
  const [userId] = useState(() => getLocalItem(Keys.userId));
  const [projectId] = useState(() => getLocalItem(Keys.projectId));
  const [topicEnabled, setTopicEnabled] = useState(false);
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [topic, setTopic] = useState('');
  const [users, setUsers] = useState<UsersObject>({
    1: {
      id: 1,
      deviceToken: '',
      firebaseUid: '',
    },
  });
  const [userCount, setUserCount] = useState<number>(1);
  const [pushObject, setPushObject] = useState<PushNotificationObject>({
    title: '',
    message: '',
    dataPartObject: {},
  });
  const [dataCount, setDataCount] = useState<number>(0);

  const onChangeUserInfoField = (user: User, fieldName: UserInfoFields) => (evt) => {
    const newUsers = {
      ...users,
    };
    newUsers[user.id] = {
      ...user,
      [fieldName]: evt.target.value,
    };
    setUsers(newUsers);
  };

  const onChangeTitleMessageFields = (fieldName: 'title' | 'message' | 'imageUrl') => (evt) => {
    const newPushObject: PushNotificationObject = {
      ...pushObject,
      [fieldName]: evt.target.value,
    };
    setPushObject(newPushObject);
  };

  const onChangeDataPartFields = (dataPart: DataPart, fieldName: DataPartFields) => (evt) => {
    const newPushObject: PushNotificationObject = {
      ...pushObject,
      dataPartObject: {
        ...pushObject.dataPartObject,
        [dataPart.id]: {
          ...pushObject.dataPartObject[dataPart.id],
          [fieldName]: evt.target.value,
        },
      },
    };
    setPushObject(newPushObject);
  };

  const onAddUserBtnClicked = () => {
    const nextId = (userCount + 1);
    const newUsers = {
      ...users,
      [nextId]: {
        id: nextId,
        deviceToken: '',
        firebaseUid: '',
      },
    };
    setUsers(newUsers);
    setUserCount(nextId);
  };

  const onAddDataBtnClicked = () => {
    const nextId = (dataCount + 1);

    const newPushObject: PushNotificationObject = {
      ...pushObject,
      dataPartObject: {
        ...pushObject.dataPartObject,
        [nextId]: {
          id: nextId,
          key: '',
          value: '',
        },
      },
    };

    setPushObject(newPushObject);
    setDataCount(nextId);
  };

  const onSendBtnClicked = () => {

    const userArray: User[] = [];

    if (topicEnabled) {
      if (topic.length === 0) {
        alert('Enter a topic');
        return;
      }
    } else {
      let userInfoOk = true;
      Object.values(users).map((user) => {
        userArray.push(user);
        if (user.firebaseUid.length === 0 || user.deviceToken.length === 0) {
          userInfoOk = false;
        }
      });

      if (!userInfoOk) {
        alert('Enter user id and device tokens for all users');
        return;
      }
    }

    const dataParts = Object.keys(pushObject.dataPartObject);

    if (pushObject.title.length === 0 &&
      pushObject.message.length === 0 &&
      dataParts.length === 0) {
      alert('You have to enter some text to send');
      return;
    }

    let dataInfoOk = true;
    if (dataParts.length > 0) {
      Object.values(pushObject.dataPartObject).map((item) => {
        if (item.key.length === 0 || item.value.length === 0) {
          dataInfoOk = false;
        }
      });
    }

    if (!dataInfoOk) {
      alert('You have to enter text for all key-value pair');
      return;
    }

    if (!topicEnabled) {
      sendMessage(getLocalItem(Keys.serverKey), userArray, pushObject, ({ failure }) => {
        if (failure > 0) {
          const successCount = userArray.length - failure;
          alert(`${successCount} out of ${userArray.length} notifications were sent successfully. Others were not sent due to invalid device token or server key.`);
          if (successCount === 0) {
            logEvent(Events.Notification_Send_Failure);
          } else {
            logEvent(Events.Some_Notification_Not_Sent);
          }
        } else if (failure === -1) {
          alert('No notifications were sent. You have to use valid server key and device token.');
          logEvent(Events.Notification_Send_Failure);
        } else {
          logEvent(Events.All_Notification_Sent);
        }

        const newPush: PushNotification[] = [];
        userArray.forEach((user) => {
          const notification: PushNotification = {
            id: uuidv4(),
            datetime: new Date().getTime(),
            userId: user.firebaseUid,
            notification: pushObject,
          };
          addNotification(userId, projectId, notification);
          newPush.push(notification);
        });

        setNotifications(newPush.concat(notifications));
        resetFields();
      });
    } else {
      sendMessageToTopic(getLocalItem(Keys.serverKey), topic, pushObject, ({ failure }) => {

        if (failure > 0) {
          alert('Notifications were sent to the topic.');
          logEvent(Events.Notification_Send_Failure_topic);
        } else if (failure === -1) {
          alert('No notifications were sent. You have to use valid server key and device token.');
          logEvent(Events.Notification_Send_Failure);
        } else {
          logEvent(Events.All_Notification_Sent);
        }

        const newPush: PushNotification[] = [];
        const notification: PushNotification = {
          id: uuidv4(),
          datetime: new Date().getTime(),
          userId: topic,
          notification: pushObject,
        };
        addNotification(userId, projectId, notification);
        newPush.push(notification);
        setNotifications(newPush.concat(notifications));
        resetFields();
      });
    }
  };

  const resetFields = () => {
    setUsers({
      1: {
        id: 1,
        deviceToken: '',
        firebaseUid: '',
      },
    });
    setTopic('');
    setPushObject({
      title: '',
      message: '',
      dataPartObject: {},
    });
    setDataCount(0);
  };

  useEffect(() => {
    if (!projectId) {
      alert('Please first create a project and select it');
      history.replace(Routes.home);
      return;
    }

    getNotifications(userId, projectId, (notifications, err) => {
      if (err) {
        logEvent(Events.History_Load_Failed);
        alert('Something went wrong. We could not load the history.');
        return;
      }

      if (notifications.length > 0) {
        setNotifications(notifications);
      }
    });
  }, []);

  return (
    <div>
      <HeaderBar/>
      <Container>
        <LeftContainer>
          <FormControlLabel
            control={<Switch
              checked={topicEnabled}
              onChange={() => setTopicEnabled(!topicEnabled)}
              name="toggleRecipient"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />}
            label="Topic"
            style={{ color: paletteColors.textPrimary }}
          />
          {
            topicEnabled ? (
              <InputBox style={{
                marginTop: 20,
              }} label="Topic"
                value={topic}
                onChange={(evt) => setTopic(evt.target.value)}/>
            ) : (
              <div style={{ marginTop: 20 }}>
                {
                  Object.values(users).map((user) => {
                    return <TokenContainer key={user.id}
                      style={{ display: 'flex' }}>
                      <InputBox
                        label="User Id" value={user.firebaseUid}
                        onChange={onChangeUserInfoField(user, 'firebaseUid')}
                        style={{ flex: 1, minWidth: 150, marginRight: 20 }}/>
                      <InputBox
                        label="Device Token"
                        value={user.deviceToken}
                        onChange={onChangeUserInfoField(user, 'deviceToken')}
                        style={{ flex: 1, minWidth: 150 }}/>
                    </TokenContainer>;
                  })
                }
                <SimpleButton onClick={onAddUserBtnClicked}>Add
                  user</SimpleButton>
              </div>
            )
          }
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputBox style={{ marginTop: 100 }} label="Title"
              value={pushObject.title}
              onChange={onChangeTitleMessageFields('title')}/>
            <InputBox label="Message" value={pushObject.message}
              onChange={onChangeTitleMessageFields('message')}/>
            <InputBox label="Image URL example: https://yourapp.com/image.png"
              value={pushObject.imageUrl ?? ''}
              onChange={onChangeTitleMessageFields('imageUrl')}/>
            {
              Object.values(pushObject.dataPartObject).map((currData) => {
                return <div key={currData.id}
                  style={{ display: 'flex', flexDirection: 'row' }}>
                  <InputBox style={{ marginRight: 20 }} label="Key"
                    value={currData.key}
                    onChange={onChangeDataPartFields(currData, 'key')}/>
                  <InputBox label="Value" value={currData.value}
                    onChange={onChangeDataPartFields(currData, 'value')}/>
                </div>;
              })
            }

            <SimpleButton style={{ marginBottom: 100 }}
              onClick={onAddDataBtnClicked}>
              Add Data
            </SimpleButton>
            <SimpleButton onClick={onSendBtnClicked}>
              Send
            </SimpleButton>
          </div>
        </LeftContainer>
        <div style={{ flex: 0.6 }}>
          <History notifications={notifications}/>
        </div>
      </Container>
    </div>
  );
};

export default NotificationForm;
