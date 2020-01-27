/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

/**
 * @typedef {{}} GameSession
 * @param {string} _id
 * @param {string} owner_id
 * @param {Array.<string>} session_maps
 */

export default class GameSessionDB {
    /** @return Promise.<GameSession> */
    static getById(id) {
        return MongoController.getById(GameSessionDB.DB_NAME, id);
    }
}

GameSessionDB.DB_NAME = "GameSession";
GameSessionDB.OWNER_FIELD = "owner_id";
GameSessionDB.SESSION_MAPS_FIELD = "session_maps";