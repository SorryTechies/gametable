/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

/**
 * @typedef {{}} GameSession
 * @param {string} _id
 * @param {string} owner_id
 * @param {Array.<string>} participants_id
 * @param {Array.<string>} session_maps_id
 */

export default class GameSessionDB {
    /** @return Promise.<GameSession> */
    static getById(id) {
        return MongoController.getById(GameSessionDB.DB_NAME, id);
    }

    static getSessionWithCharacter(character_id) {
        return MongoController.select(GameSessionDB.DB_NAME, {});
    }
}

GameSessionDB.DB_NAME = "GameSession";
GameSessionDB.OWNER_FIELD = "owner_id";
GameSessionDB.PARTICIPANTS_FIELD = "participants_id";
GameSessionDB.SESSION_MAPS_FIELD = "session_maps_id";