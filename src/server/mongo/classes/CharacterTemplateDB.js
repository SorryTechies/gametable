/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

export default class CharacterTemplateDB {
    /** @return Promise<CharacterTemplate> */
    static getById(id) {
        return MongoController.getById(CharacterTemplateDB.DB_NAME, id);
    }
}

CharacterTemplateDB.DB_NAME = "GameObject";
CharacterTemplateDB.DATA_FIELD = "data";
CharacterTemplateDB.NAME_FIELD = "name";