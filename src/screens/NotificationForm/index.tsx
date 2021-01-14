import React, { useEffect, useState } from 'react';
import { Events, logEvent } from '../../services/logger';
import History from '../History';
import { HeaderBar } from '../../components/HeaderBar';
import { Keys } from '../../services/hooks/Keys';
import { addNotification, getNotifications } from '../../services/firebase';
import { useLocalStorage } from '../../services/hooks/useLocalStorage';
import { PushNotification, User } from '../../services/types';
import * as firebase from '../../services/firebase';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  LeftContainer,
  SimpleButton,
} from '../../styles/commonStyles';
import { TokenContainer, InputBox } from './styles';

type UsersObject = {
  [key: string]: User;
}

const NotificationForm = () => {
  const { getLocalItem } = useLocalStorage();
  const [message, setMessage] = useState<string>('');
  const [accountName] = useState(() => getLocalItem(Keys.accountName));
  const [projectId] = useState(() => getLocalItem(Keys.projectId));
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [users, setUsers] = useState<UsersObject>({
    1: {
      id: 1,
      deviceToken: '',
      firebaseUid: '',
    },
  });
  const [userCount, setUserCount] = useState<number>(1);

  const onChangeFirebaseUidField = (user: User) => (evt) => {
    const newUsers = {
      ...users,
    };
    newUsers[user.id] = {
      ...user,
      firebaseUid: evt.target.value,
    };
    setUsers(newUsers);
  };

  const onChangeDeviceTokenField = (user: User) => (evt) => {
    const newUsers = {
      ...users,
    };
    newUsers[user.id] = {
      ...user,
      deviceToken: evt.target.value,
    };
    setUsers(newUsers);
  };

  const onSendBtnClicked = () => {

    let userInfoOk = true;
    const userArray: User[] = [];
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

    if (message.length === 0) {
      alert('Enter a message');
      return;
    }

    firebase.sendMessage(getLocalItem(Keys.serverKey), userArray, message)
      .then(() => {
        logEvent(Events.Notification_Sent);

        const newPush: PushNotification[] = [];
        userArray.forEach((user) => {
          const notification: PushNotification = {
            id: uuidv4(),
            datetime: new Date().getTime(),
            userId: user.firebaseUid,
            message,
          };
          addNotification(accountName, projectId, notification);
          newPush.push(notification);
        });

        setUsers({
          1: {
            id: 1,
            deviceToken: '',
            firebaseUid: '',
          },
        });
        setMessage('');
        setNotifications(newPush.concat(notifications));
      })
      .catch((err) => {
        logEvent(Events.Notification_Send_Failure);
        if (err) {
          alert('Error sending push notifications');
        }
      });
  };

  useEffect(() => {
    getNotifications(accountName, projectId, (notifications, err) => {
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
          {
            Object.values(users).map((user) => {
              return <TokenContainer key={user.id} style={{ display: 'flex' }}>
                <InputBox
                  label="User Id" value={user.firebaseUid}
                  onChange={onChangeFirebaseUidField(user)}
                  style={{ flex: 1, minWidth: 150, marginRight: 20 }}/>
                <InputBox
                  label="Device Token"
                  value={user.deviceToken}
                  onChange={onChangeDeviceTokenField(user)}
                  style={{ flex: 1, minWidth: 150 }}/>
              </TokenContainer>;
            })
          }
          <SimpleButton onClick={() => {
            const nextId = (userCount + 1);
            const newUsers = {
              ...users,
            };
            newUsers[nextId] = {
              id: nextId,
              deviceToken: '',
              firebaseUid: '',
            };
            setUsers(newUsers);
            setUserCount(nextId);
          }}>Add user
          </SimpleButton>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputBox style={{ marginTop: 100 }} label="Message" value={message}
              onChange={(evt) => setMessage(evt.target.value)}/>
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
