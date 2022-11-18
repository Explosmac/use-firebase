import { signInWithEmailAndPassword, signOut, UserCredential, Auth } from 'firebase/auth';
declare const withAuth: (auth: Auth) => {
    login: (email: string, password: string) => Promise<UserCredential>;
    getToken: (forceRefresh?: boolean) => Promise<string> | undefined;
};
export { withAuth, signInWithEmailAndPassword, signOut };
