/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

/**
 * @typedef {{}} SessionMap
 * @param {string} _id
 * @param {{x: number, y: number}} SIZE_FIELD
 * @param {string} dm_url
 * @param {string} url
 * @param {Array.<string>} map_objects_id
 */

export default class SessionMapDB {
    static getById(id) {
        return MongoController.getById(SessionMapDB.DB_NAME, id);
    }
}

SessionMapDB.DB_NAME = "SessionMap";
SessionMapDB.SIZE_FIELD = "size";
SessionMapDB.DM_URL_FIELD = "dm_url";
SessionMapDB.URL_FIELD = "url";
SessionMapDB.MAP_OBJECTS_FIELD = "map_objects_id";
