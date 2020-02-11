/**
 * Created by LastBerserk on 27.01.2020.
 */

import * as MongoDB from "mongodb";
import MongoController from "../MongoController";

export default class CharacterDB {
    /** @return Promise<GameCharacter> */
    static getById(id) {
        return MongoController.getById(CharacterDB.DB_NAME, id);
    }

    /**
     * @param {Array<ids>} id
     * @return Promise<GameCharacter>
     */
    static findByIds(id) {
        const idArray = id.map(id => typeof id === "string" ? MongoDB.ObjectID(id) : id);
        return MongoController.select(CharacterDB.DB_NAME, {_id: {$in: idArray}});
    }
}

CharacterDB.DB_NAME = "Character";
CharacterDB.DATA_FIELD = "data";
CharacterDB.NAME_FIELD = "name";