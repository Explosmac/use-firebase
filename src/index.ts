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

  const getEmailCredential = (password: string) => {
    if (auth.currentUser?.email) {
      return EmailAuthProvider.credential(auth.currentUser.email, password);
    } else {
      throw { status: 400, message: 'User not found' };
    }
  };

  const changePassword = async (newPass: string, confPass: string, oldPass: string) => {
    if (newPass !== confPass) {
      throw { status: 400, message: 'Not match' };
    }
    if (newPass === oldPass) {
      throw { status: 400, message: 'Same password' };
    }
    const credential = getEmailCredential(oldPass);
    if (auth.currentUser) {
      const authCred = await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPass);
      return authCred;
    } else {
      throw { status: 403, message: 'User not found' };
    }
  };

  return {
    createUser,
    login,
    logout,
    resetPassword,
    getEmailCredential,
    getToken,
    onAuthChanged,
    changePassword,
    currentUser: auth.currentUser,
  };
};

export default authFirebase;
