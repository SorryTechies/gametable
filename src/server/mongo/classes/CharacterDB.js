/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

export default class CharacterDB {
    /** @return Promise<GameCharacter> */
    static getById(id) {
        return MongoController.getById(CharacterDB.DB_NAME, id);
    }
}

CharacterDB.DB_NAME = "Character";
CharacterDB.DATA_FIELD = "data";
CharacterDB.NAME_FIELD = "name";