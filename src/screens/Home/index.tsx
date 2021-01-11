import DeleteIcon from '@material-ui/icons/Delete';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Events, logEvent } from '../../services/logger';
import { HeaderBar } from '../../components/HeaderBar';
import { Keys } from '../../services/hooks/Keys';
import {
  addProject,
  getProjects,
  deleteProject,
} from '../../services/firebase';
import { Project } from '../../services/types';
import { Routes } from '../../routes';
import { useLocalStorage } from '../../services/hooks/useLocalStorage';
import {
  SimpleButton,
  Container,
  LeftContainer,
} from '../../styles/commonStyles';
import {
  AddPorjectContainer,
  ProjectItem,
  ProjectTitle,
  ProjectsContainer,
  InputBox,
} from './styles';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const history = useHistory();
  const { setLocalItem, getLocalItem } = useLocalStorage();
  const [projectName, setProjectName] = useState('');
  const [serverKey, setServerKey] = useState('');
  const [accountName] = useState(() => getLocalItem(Keys.accountName));
  const [projects, setProjects] = useState<Project[]>([]);

  const onClickAddProjectBtn = () => {
    if (projectName.length === 0 || serverKey.length === 0) {
      alert('Project name and server key are required');
      return;
    }

    const project: Project = {
      id: uuidv4(),
      projectName,
      serverKey,
    };

    if (accountName.length === 0) {
      alert('Something went wrong. Please logout and login again.');
    } else {
      addProject(accountName, project, err => {
        if (err) {
          logEvent(Events.Failed_Add_Project);
          alert('Something went wrong. please try again later.');
          return;
        }

        logEvent(Events.Project_Added);
        setProjects(projects.concat(project));
        setProjectName('');
        setServerKey('');
      });
    }
  };

  useEffect(() => {
    getProjects(accountName, (projects, err) => {
      if (err) {
        alert('Something went wrong. We could not load your projects.');
        logEvent(Events.Project_Load_Failed);
        return;
      }

      if (projects.length > 0) {
        setProjects(projects);
      }

    });

  }, []);

  return (
    <div>
      <HeaderBar/>
      <Container>
        <LeftContainer>
          <AddPorjectContainer>
            <InputBox label="Project name" value={projectName}
              onChange={(evt) => setProjectName(evt.target.value)}/>
            <InputBox label="Server/API key"
              value={serverKey}
              onChange={(evt) => setServerKey(evt.target.value)}/>
            <SimpleButton name="Add Project" onClick={onClickAddProjectBtn}>
              Add Project
            </SimpleButton>
          </AddPorjectContainer>
        </LeftContainer>
        <ProjectsContainer>
          {
            projects.length > 0 ? (
              <ProjectTitle>Projects:</ProjectTitle>
            ) : null
          }
          {
            projects.map((project) => (
              <div style={{
                flexDirection: 'row',
                display: 'flex',
                marginBottom: 5,
              }} key={project.id}>
                <ProjectItem onClick={() => {
                  setLocalItem(Keys.serverKey, project.serverKey);
                  setLocalItem(Keys.projectName, project.projectName);
                  setLocalItem(Keys.projectId, project.id);
                  history.push(Routes.notificationForm);
                }}>
                  {project.projectName}
                </ProjectItem>
                <DeleteIcon style={{ alignSelf: 'center' }} onClick={() => {
                  const result = confirm('Are you sure to delete this project?');
                  if (result) {
                    const index = projects.findIndex(p => p.id === project.id);
                    const start = projects.slice(0, index);
                    const end = projects.slice(index + 1, projects.length);
                    const modifiedProjectList = start.concat(end);

                    deleteProject(accountName, project.id, modifiedProjectList, (err) => {
                      if (err) {
                        alert('Something went wrong. Could not delete the project.');
                        return;
                      }

                      logEvent(Events.Project_Deleted);
                      setProjects(modifiedProjectList);
                    });
                  }
                }}/>
              </div>
            ))
          }
        </ProjectsContainer>
      </Container>
    </div>
  );
};

export default Home;
