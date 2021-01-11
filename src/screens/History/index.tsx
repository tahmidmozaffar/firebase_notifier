import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../services/hooks/useLocalStorage';
import { Keys } from '../../services/hooks/Keys';
import { useSessionStorage } from '../../services/hooks/useSessionStorage';
import { PushNotification } from '../../services/types';
import {
  NotificationsTitle,
  TableCellHeader,
  Container,
  InputBox,
  ClearButton,
} from './styles';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
} from '@material-ui/core';

const History = () => {
  const { getSessionItem } = useSessionStorage();
  const { getLocalItem } = useLocalStorage();
  const [projectId] = useState(() => getLocalItem(Keys.projectId));
  const [notifications] = useState<PushNotification[]>(() => JSON.parse(getSessionItem(projectId)));
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [searchText, setSearchText] = useState('');

  const onChangeSearchText = (searchBy: string) => {
    setSearchText(searchBy);
  };

  useEffect(() => {
    const array: PushNotification[] = [];
    notifications.forEach((item) => {
      if (item.userId.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
        || item.message.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
        array.push(item);
      }
    });

    setFilteredNotifications(array);
  }, [searchText]);

  return (
    <Container>
      <NotificationsTitle>Sent Notifications</NotificationsTitle>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <InputBox label="Search" value={searchText}
          onChange={(evt) => onChangeSearchText(evt.target.value)}/>
        <ClearButton onClick={() => setSearchText('')}>Clear</ClearButton>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ width: '30%' }}><TableCellHeader>Time</TableCellHeader>
              </TableCell>
              <TableCell style={{ width: '30%' }}>
                <TableCellHeader>User Id</TableCellHeader>
              </TableCell>
              <TableCell style={{ width: '40%' }}>
                <TableCellHeader>Message</TableCellHeader>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredNotifications.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{dayjs(row.datetime)
                  .format('MMM DD, YYYY h:mm a')}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell>{row.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default History;
