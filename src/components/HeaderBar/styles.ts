import { SimpleButton } from '../../styles/commonStyles';
import styled from 'styled-components';

export const AccountNameText = styled.span`
  font-size: 20px;
  align-self: center;
  margin-right: 30px;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-right: 15px;
    font-size: 14px;
  }

  @media (max-width: 440px) {
    margin-right: 5px;
    font-size: 14px;
  }
`;

export const ProjectNameText = styled.span`
  flex: 1;
  font-size: 20px;
  align-self: center;
  margin-left: 60px;
  font-weight: bold;

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

    @media (max-width: 768px) {
      margin-right: 30px;
      width: 80px;
    }

    @media (max-width: 440px) {
      margin-right: 15px;
    }
  }
`;
