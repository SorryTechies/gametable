/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

export default class GameSessionDB {
    /** @return Promise<GameSession> */
    static getById(id) {
        return MongoController.getById(GameSessionDB.DB_NAME, id);
    }

    /**
     * @param character_id
     * @return {Promise<Array<GameSession>>}
     */
    static findSessionsByCharacter(character_id) {
        return MongoController.select(GameSessionDB.DB_NAME, {[GameSessionDB.PARTICIPANTS_CHARACTER_FIELD]: [character_id]});
    }
}

GameSessionDB.DB_NAME = "GameSession";
GameSessionDB.OWNER_FIELD = "owner_id";
GameSessionDB.PARTICIPANTS_CHARACTER_FIELD = "participants_character_id";
GameSessionDB.SESSION_MAPS_FIELD = "session_maps_id";