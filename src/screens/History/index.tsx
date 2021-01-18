import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { DataPart, PushNotification } from '../../services/types';
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

type Props = {
  notifications: PushNotification[];
}

const History: FC<Props> = ({ notifications }) => {

  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [searchText, setSearchText] = useState('');

  const onChangeSearchText = (searchBy: string) => {
    setSearchText(searchBy);
  };

  const isDatapartContainsSearchedText = (
    dataPartObject: { [key: string]: DataPart },
    searchedText: string,
  ): boolean => {
    let doesContain = false;
    Object.values(dataPartObject).map((item) => {
      if (item.key.toLowerCase().indexOf(searchedText) >= 0
        || item.value.toLowerCase().indexOf(searchedText) >= 0) {
        doesContain = true;
      }
    });

    return doesContain;
  };

  useEffect(() => {
    const array: PushNotification[] = [];
    const text = searchText.toLowerCase();
    notifications.forEach((item) => {

      // @ts-ignore
      if ((item.message && item.message.toLowerCase()
          .indexOf(text)) >= 0
        || item.userId.toLowerCase().indexOf(text) >= 0
        || (item.notification && (item.notification.title.toLowerCase()
          .indexOf(text) >= 0 || item.notification.message.toLowerCase()
          .indexOf(text) >= 0 || isDatapartContainsSearchedText(item.notification.dataPartObject, text)))
      ) {
        array.push(item);
      }

    });

    setFilteredNotifications(array);
  }, [searchText, notifications]);

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
                style={{ width: '30%' }}><TableCellHeader>DateTime</TableCellHeader>
              </TableCell>
              <TableCell style={{ width: '30%' }}>
                <TableCellHeader>User Id / Topic</TableCellHeader>
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
                {
                  row.message ? (
                    <TableCell>{row.message}</TableCell>
                  ) : (
                    <TableCell>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{`Title: "${row.notification.title}"`}</span>
                        <span>{`Message: "${row.notification.message}"`}</span>
                        <span><u>Data:</u></span>
                        {
                          Object.values(row.notification.dataPartObject)
                            .map((item) => <span key={item.id}>
                              {`${item.key}: "${item.value}"`}
                              </span>,
                            )
                        }
                      </div>
                    </TableCell>
                  )
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default React.memo(History);
