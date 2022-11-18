"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.signInWithEmailAndPassword = exports.withAuth = void 0;
var auth_1 = require("firebase/auth");
Object.defineProperty(exports, "signInWithEmailAndPassword", { enumerable: true, get: function () { return auth_1.signInWithEmailAndPassword; } });
Object.defineProperty(exports, "signOut", { enumerable: true, get: function () { return auth_1.signOut; } });
// const createUser = async (auth: Auth, email: string, password: string) =>
//   await createUserWithEmailAndPassword(auth, email, password);
var withAuth = function (auth) {
    var login = function (email, password) {
        return (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
    };
    var getToken = function (forceRefresh) { var _a; return (_a = auth === null || auth === void 0 ? void 0 : auth.currentUser) === null || _a === void 0 ? void 0 : _a.getIdToken(forceRefresh); };
    return { login: login, getToken: getToken };
};
exports.withAuth = withAuth;
