import { AppBar } from '@material-ui/core';
import { paletteColors } from '../../styles/palette';
import { SimpleButton } from '../../styles/commonStyles';
import styled from 'styled-components';

export const MainAppBar = styled(AppBar)`
  flex-direction: row-reverse;
  background-color: ${paletteColors.deepDarkBlue};
`;

export const ProjectNameText = styled.span`
  flex: 1;
  font-size: 20px;
  align-self: center;
  margin-left: 60px;
  font-weight: bold;
  color: ${paletteColors.textPrimary};

  @media (max-width: 768px) {
    margin-left: 30px;
    font-size: 14px;
  }

  @media (max-width: 440px) {
    margin-left: 15px;
    font-size: 14px;
  }
`;

export const LogoutButton = styled(SimpleButton)`
  && {
    font-size: 12px;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    width: 100px;
    margin-right: 60px;
    color: ${paletteColors.textPrimary};

    @media (max-width: 768px) {
      margin-right: 30px;
      width: 80px;
    }

    @media (max-width: 440px) {
      margin-right: 15px;
    }
  }
`;
