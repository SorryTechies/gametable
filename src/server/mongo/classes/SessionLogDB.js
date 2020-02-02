/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

export default class SessionLogDB {
    /**
     * @param {string} game_session_id
     * @param {number} skip
     * @param {number} limit
     * @return Promise<Array<SessionLog>>
     */
    static findInRange(game_session_id, skip, limit) {
        return MongoController.aggregate(SessionLogDB.DB_NAME, [{
            $match: {[SessionLogDB.GAME_SESSION_FIELD]: game_session_id}
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
