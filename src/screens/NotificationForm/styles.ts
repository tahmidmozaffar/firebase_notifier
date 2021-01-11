import styled from 'styled-components';
import { Input } from '../../styles/commonStyles';

export const InputBox = styled(Input)`
  && {
    display: flex;
    width: 100%;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

export const TokenContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

