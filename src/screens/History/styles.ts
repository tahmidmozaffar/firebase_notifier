import { Button } from '@material-ui/core';
import { Input } from '../../styles/commonStyles';
import styled from 'styled-components';

export const Container = styled.div`
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const NotificationsTitle = styled.h5`
  margin-block-start: 0;
  margin-block-end: 0;
  margin-bottom: 30px;
`;

export const TableCellHeader = styled.h4`
  margin-block-start: 0;
  margin-block-end: 0;
`;

export const InputBox = styled(Input)`
  && {
    display: flex;
    margin-right: 10px;
    width: 100%;

    @media (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

`;

export const ClearButton = styled(Button).attrs({
  variant: 'contained',
  color: 'secondary',
})`
  margin-bottom: 20px;
`;
