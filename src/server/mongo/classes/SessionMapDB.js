/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

export default class SessionMapDB {
    /**
     * @param {string} id
     * @return Promise<SessionMap>
     */
    static getById(id) {
        return MongoController.getById(SessionMapDB.DB_NAME, id);
    }
}

SessionMapDB.DB_NAME = "SessionMap";
SessionMapDB.SIZE_FIELD = "size";
SessionMapDB.DM_URL_FIELD = "dm_url";
SessionMapDB.URL_FIELD = "url";
SessionMapDB.MAP_OBJECTS_FIELD = "map_objects_id";
