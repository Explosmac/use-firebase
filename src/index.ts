import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  UserCredential,
  NextOrObserver,
  User,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  Auth,
} from 'firebase/auth';

// const createUser = async (auth: Auth, email: string, password: string) =>
//   await createUserWithEmailAndPassword(auth, email, password);

const withAuth = (auth: Auth) => {
  const login: (email: string, password: string) => Promise<UserCredential> = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const getToken = (forceRefresh?: boolean) => auth?.currentUser?.getIdToken(forceRefresh);

  return { login, getToken };
};

// const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

// const onAuthChanged = (observer: NextOrObserver<User>) => onAuthStateChanged(auth, observer);

// const reauthUser = (password: string) => {
//   if (auth.currentUser?.email) {
//     return EmailAuthProvider.credential(auth.currentUser.email, password);
//   } else {
//     throw { status: 400, message: 'User not found' };
//   }
// };

// const changePassword = async (pass1: string, pass2: string, oldPass: string) => {
//   if (pass1 !== pass2) {
//     throw { status: 400, message: 'Not match' };
//   }
//   if (pass1 === oldPass) {
//     throw { status: 400, message: 'Same password' };
//   }
//   const credential = reauthUser(oldPass);
//   if (auth.currentUser) {
//     const authCred = await reauthenticateWithCredential(auth.currentUser, credential);
//     await updatePassword(auth.currentUser, pass1);
//     return authCred;
//   } else {
//     throw { status: 403, message: 'User not found' };
//   }
// };

export { withAuth, signInWithEmailAndPassword, signOut }; // resetPassword, getToken, onAuthChanged, changePassword
