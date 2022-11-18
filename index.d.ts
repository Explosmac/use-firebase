import { UserCredential, NextOrObserver, User, Auth } from 'firebase/auth';
declare const authFirebase: (auth: Auth) => {
    createUser: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    getEmailCredential: (password: string) => import("@firebase/auth").EmailAuthCredential;
    getToken: (forceRefresh?: boolean) => Promise<string> | undefined;
    onAuthChanged: (observer: NextOrObserver<User>) => import("@firebase/util").Unsubscribe;
    changePassword: (newPass: string, confPass: string, oldPass: string) => Promise<UserCredential>;
    currentUser: User | null;
};
export default authFirebase;
