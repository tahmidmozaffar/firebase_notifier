import firebase from 'firebase/app';
import 'firebase/firestore';
import { Keys } from '../../services/hooks/Keys';
import { useSessionStorage } from '../../services/hooks/useSessionStorage';
import { Project } from '../../services/types';

export const addProject = (userId: string, project: Project, callback: (err?: Error) => void) => {

  const { getSessionItem, setSessionItem } = useSessionStorage();
  const projects = JSON.parse(getSessionItem(Keys.allProjects));
  const modifiedProjectList = projects.concat(project);
  setSessionItem(Keys.allProjects, JSON.stringify(modifiedProjectList));

  const db = firebase.firestore();
  db.collection(userId).doc('projects')
    .set({ projectsArray: modifiedProjectList }).then(() => {
    callback();
  }).catch((err) => {
    callback(err);
  });
};

export const deleteProject = (userId: string, projectId: string, modifiedProjects: Project[], callback: (err?: Error) => void) => {

  const { setSessionItem } = useSessionStorage();

  const db = firebase.firestore();
  db.collection(userId).doc('projects')
    .set({ projectsArray: modifiedProjects }).then(() => {
    db.collection(userId).doc(projectId).delete().then(() => {
      callback();
      setSessionItem(Keys.allProjects, JSON.stringify(modifiedProjects));
    }).catch((err) => {
      callback(err);
    });
  }).catch((err) => {
    callback(err);
  });

};

export const getProjects = (userId: string, callback: (projects: Project[], err?: Error) => void) => {

  const { setSessionItem, getSessionItem } = useSessionStorage();
  const allProjects = getSessionItem(Keys.allProjects);

  const projects: Project[] = allProjects ? JSON.parse(allProjects) : [];

  if (projects.length > 0) {
    callback(projects);
    return;
  }

  const db = firebase.firestore();
  db.collection(userId).doc('projects').get()
    .then((doc) => {

      const projects = doc.data()?.['projectsArray'] ?? [];
      setSessionItem(Keys.allProjects, JSON.stringify(projects));
      callback(projects);
    }).catch((err) => callback([], err));
};
