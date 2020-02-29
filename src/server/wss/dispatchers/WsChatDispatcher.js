/**
 * Created by LastBerserk on 06.02.2020.
 */

import GameSessionDB from "../../mongo/classes/GameSessionDB";
import WebSocketUser from "../WebSocketUser";
import ChatMessageDB from "../../mongo/classes/ChatMessageDB";
import MongoController from "../../mongo/MongoController";

/**
 * @param {WebSocketMessage} message
 * @param ws
 * @return {Promise.<void>}
 */
export async function handleNewChatMessage(message, ws) {
    const session = await GameSessionDB.getById(message.game_id);
    if (!session) throw new Error("No session found with id " + message.game_id);
    if (Array.isArray(message.data.receiver) && message.data.receiver.length > 0) {
        WebSocketUser.sendToTheDM(session, message, ws);
    } else {
        WebSocketUser.sendToGameSession(session, message, ws);
    }
    await MongoController.insert(ChatMessageDB.DB_NAME, {
        [ChatMessageDB.TIMESTAMP_FIELD]: new Date(),
        [ChatMessageDB.TEXT_FIELD]: message.data.text,
        [ChatMessageDB.SESSION_FIELD]: session._id,
        [ChatMessageDB.TARGET_FIELD]: message.data.receiver
    });
}