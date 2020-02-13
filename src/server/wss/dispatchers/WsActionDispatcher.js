/**
 * Created by LastBerserk on 06.02.2020.
 */

import GameSessionDB from "../../mongo/classes/GameSessionDB";
import WebSocketUser from "../WebSocketUser";
import RoundActionCache from "../../logic/RoundActionCache";

/**
 * @param {WebSocketMessage} message
 * @param ws
 * @return {Promise.<void>}
 */
export async function handleNewIntent(message, ws) {
    const session = await GameSessionDB.getById(message.game_id);
    if (!session) throw new Error("No session found with id " + message.game_id);
    if (message.data.isHidden) {
        WebSocketUser.sendToTheDM(session, message, ws);
    } else {
        WebSocketUser.sendToGameSession(session, message, ws);
    }
    switch (message.action) {
        case "new":
            return RoundActionCache.storeAction(session._id, message.data);
        case "rem":
            return  RoundActionCache.removeAction(session._id, message.data);
        case "clear":
            return RoundActionCache.clearRound(session._id);
    }
}