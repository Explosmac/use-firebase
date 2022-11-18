import { signInWithEmailAndPassword, signOut, UserCredential, Auth } from 'firebase/auth';
declare const login: (auth: Auth, email: string, password: string) => Promise<UserCredential>;
export { login, signInWithEmailAndPassword, signOut };
