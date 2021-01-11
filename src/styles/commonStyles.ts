import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';

export const Input = styled(TextField).attrs({
  variant: 'outlined',
})`
  && {
    width: 400px;
    margin-bottom: 20px;
  }
`;

export const SimpleButton = styled(Button).attrs({
  variant: 'contained',
  color: 'secondary',
})`
  && {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 200px;
  }
`;

export const Container = styled.div`
  display: flex;
  padding: 60px;
  transition: 0.3s;

  @media (max-width: 960px) {
    flex-direction: column;
    padding: 30px;
  }

  @media (max-width: 560px) {
    padding: 15px;
  }
`;

export const LeftContainer = styled.div`
  flex: 0.4;
  margin-right: 20px;
  transition: 0.3s;

  @media (max-width: 768px) {
    margin-right: 0px;
    margin-bottom: 30px;
  }
`;
