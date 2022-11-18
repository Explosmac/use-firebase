"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signInWithEmailAndPassword = exports.login = void 0;
var auth_1 = require("firebase/auth");
Object.defineProperty(exports, "signInWithEmailAndPassword", { enumerable: true, get: function () { return auth_1.signInWithEmailAndPassword; } });
Object.defineProperty(exports, "signOut", { enumerable: true, get: function () { return auth_1.signOut; } });
// const createUser = async (auth: Auth, email: string, password: string) =>
//   await createUserWithEmailAndPassword(auth, email, password);
var login = function (auth, email, password) {
    return (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
};
exports.login = login;
