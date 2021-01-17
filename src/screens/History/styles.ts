import { Button } from '@material-ui/core';
import { paletteColors } from '../../styles/palette';
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
  color: ${paletteColors.textPrimary};
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
      margin-bottom: 20px;
    }
  }

`;

export const ClearButton = styled(Button).attrs({
  variant: 'contained',
  color: 'secondary',
})`
  margin-bottom: 20px;
  height: 55px;
`;
