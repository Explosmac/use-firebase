import { UserCredential, NextOrObserver, User } from 'firebase/auth';
export type FirebaseConfig = {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
};
declare const useFirebase: (config: FirebaseConfig) => {
    createUser: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    getToken: (forceRefresh?: boolean) => Promise<string> | undefined;
    onAuthChanged: (observer: NextOrObserver<User>) => import("@firebase/util").Unsubscribe;
    changePassword: (pass1: string, pass2: string, oldPass: string) => Promise<UserCredential>;
};
export default useFirebase;
