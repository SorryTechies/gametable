/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

/**
 * @typedef {{}} SessionLog
 * @param {string} _id
 * @param {string} game_session_id
 * @param {string} log
 * @param {Date} stmp
 */

export default class SessionLogDB {
    /** @return Promise.<Array.<SessionLog>> */
    static findInRange(id, skip, limit) {
        return MongoController.aggregate(SessionLogDB.DB_NAME, [{
            $match: {[SessionLogDB.GAME_SESSION_FIELD]: id}
        },{
            $sort: {[SessionLogDB.INSERT_STAMP_FIELD]: -1}
        }, {
            $skip: skip
        }, {
            $limit: limit
        }]);
    }
}

SessionLogDB.DB_NAME = "SessionLog";
SessionLogDB.GAME_SESSION_FIELD = "game_session_id";
SessionLogDB.LOG_FIELD = "log";
SessionLogDB.INSERT_STAMP_FIELD = "stmp";
