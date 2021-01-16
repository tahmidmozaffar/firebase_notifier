import { paletteColors } from '../../styles/palette';
import { Input } from '../../styles/commonStyles';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const InputBox = styled(Input)`
  && {
    @media (max-width: 440px) {
      width: 90%;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`;

export const Title = styled.span`
  font-size: 30px;
  padding: 40px;
  margin-bottom: 30px;
  color: ${paletteColors.textPrimary};
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const TextButton = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: ${paletteColors.textPrimary};
`;
