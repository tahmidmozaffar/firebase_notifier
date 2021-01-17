import firebase from 'firebase/app';
import 'firebase/auth';

export const signUpWithEmailPassword = (
  email: string,
  password: string,
  callback: (userId: string | undefined, errorMessage: string | null) => void,
) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      callback(user.user?.uid, null);
    }).catch((err) => {
    console.log(err);
    callback(undefined, err.message);
  });
};

export const signInWithEmailPassword = (
  email: string,
  password: string,
  callback: (userId: string | undefined, errorMessage: string | null) => void,
) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      callback(user.user?.uid, null);
    }).catch((err) => {
    console.log(err);
    callback(undefined, err.message);
  });
};

export const signInWithGoogle = (callback: (userId: string | undefined, errorMessage: string | null) => void) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var userId = result.user?.uid;
      callback(userId, null);
    }).catch((error) => {
    callback(undefined, error.message);
  });
};

export const signOut = () => {
  firebase.auth().signOut();
};
