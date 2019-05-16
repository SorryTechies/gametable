/**
 * Created by LastBerserk on 25.01.2019.
 */

import IndexedDDB from "../db/IndexedDDB";
let login = null;
let isLogined = false;
let isDM = false;

export default class LoginController {

    static checkLoginInDB() {
        return new IndexedDDB().getAuth();
    }

    static setLogin(username) {
        login = username;
    }

    static logout() {
        login = null;
        isLogined = false;
    }

    static loginOk(dm) {
        isLogined = true;
        isDM = !!dm;
        return new IndexedDDB().saveAuth(login);
    }

    static isLogined() {
        return isLogined;
    }

    static getLogin() {
        return login;
    }

    static isDM() {
        return isDM;
    }

    static logOut() {
        login = null;
        isLogined = false;
        isDM = false;
        return new IndexedDDB().clearAuth();
    }
}