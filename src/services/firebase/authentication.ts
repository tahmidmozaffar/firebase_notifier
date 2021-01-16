import firebase from 'firebase';

export const signUp = async (accountName: string): Promise<{ success: boolean, message?: string }> => {
  const db = firebase.firestore();
  const documentData = await db.collection(accountName).doc('projects').get();
  if (documentData.exists) {
    return {
      success: false,
      message: 'Account name is not available. Please choose a different account name.',
    };
  } else {
    db.collection(accountName).doc('projects').set({ projectsArray: [] });
    return { success: true, 'message': 'Account is created successfully' };
  }
};

export const signIn = async (accountName: string): Promise<{ success: boolean, message?: string }> => {

  const db = firebase.firestore();
  const documentData = await db.collection(accountName).doc('projects').get();
  if (documentData.exists) {
    return { success: true };
  } else {
    return {
      success: false,
      message: 'Account does not exist. Please signup first.',
    };
  }
};
