/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

/**
 * @typedef {{}} Character
 * @param {string} _id
 * @param {string} data
 */

export default class CharacterDB {
    /** @return Promise.<Character> */
    static getById(id) {
        return MongoController.getById(CharacterDB.DB_NAME, id);
    }
}

CharacterDB.DB_NAME = "Character";
CharacterDB.USERNAME_FIELD = "username";