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

const authFirebase = (auth: Auth) => {
  const createUser = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  const login: (email: string, password: string) => Promise<UserCredential> = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  const getToken = (forceRefresh?: boolean) => auth?.currentUser?.getIdToken(forceRefresh);

  const onAuthChanged = (observer: NextOrObserver<User>) => onAuthStateChanged(auth, observer);

  const reauthUser = (password: string) => {
    if (auth.currentUser?.email) {
      return EmailAuthProvider.credential(auth.currentUser.email, password);
    } else {
      throw { status: 400, message: 'User not found' };
    }
  };

  const changePassword = async (pass1: string, pass2: string, oldPass: string) => {
    if (pass1 !== pass2) {
      throw { status: 400, message: 'Not match' };
    }
    if (pass1 === oldPass) {
      throw { status: 400, message: 'Same password' };
    }
    const credential = reauthUser(oldPass);
    if (auth.currentUser) {
      const authCred = await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, pass1);
      return authCred;
    } else {
      throw { status: 403, message: 'User not found' };
    }
  };

  return { createUser, login, logout, resetPassword, getToken, onAuthChanged, changePassword };
};

export default authFirebase;
