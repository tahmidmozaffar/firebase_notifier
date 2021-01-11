import { Input } from '../../styles/commonStyles';
import styled from 'styled-components';
import { Card } from '@material-ui/core';

export const AddPorjectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputBox = styled(Input)`
  && {
    display: flex;
    width: 100%;
    transition: 0.3s;
    
    @media (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }

  
`;

export const ProjectsContainer = styled.div`
  margin-left: 10%;
  flex: 1 0 0;
  transition: 0.3s;
  
  @media (max-width: 768px) {
    margin-left: 0px;
  }
`;

export const ProjectTitle = styled.h4`
  && {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-bottom: 20px;
  }
`;

export const ProjectItem = styled(Card)`
  background: #ffA500;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 500px;
  transition: 0.3s;
  margin-right:5px;

  :hover {
    background: rgb(178, 106, 0);
  }

  @media (max-width: 768px) {
    max-width: calc(100% - 20px);
  }
`;
