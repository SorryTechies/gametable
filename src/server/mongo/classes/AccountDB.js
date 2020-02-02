/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

/**
 * @typedef {{}} Account
 * @param {string} _id
 * @param {string} username
 * @param {Array.<string>} characters_ids
 */

export default class AccountDB {
    /** @return Promise.<Account> */
    static getById(id) {
        return MongoController.getById(AccountDB.DB_NAME, id);
    }

    /** @return Promise.<Account> */
    static getByUsername(name) {
        return MongoController.getOne(AccountDB.DB_NAME, {[AccountDB.NAME_FIELD]: name});
    }

    /** @return Promise.<Account> */
    static findOwner(character_id) {
        return MongoController.getOne(AccountDB.DB_NAME, {[AccountDB.CHARACTERS_FIELD]: [character_id]});
    }
}

AccountDB.DB_NAME = "Account";
AccountDB.USERNAME_FIELD = "username";
AccountDB.CHARACTERS_FIELD = "characters_ids";