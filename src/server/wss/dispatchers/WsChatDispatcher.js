/**
 * Created by LastBerserk on 06.02.2020.
 */

import GameSessionDB from "../../mongo/classes/GameSessionDB";
import WebSocketUser from "../WebSocketUser";
import ChatMessageDB from "../../mongo/classes/ChatMessageDB";
import MongoController from "../../mongo/MongoController";
import ServerChatMessage from "../../logic/ServerChatMessage";

/**
 * @param {WebSocketMessage} message
 * @param ws
 * @return {Promise.<void>}
 */
export async function handleNewChatMessage(message, ws) {
    const session = await GameSessionDB.getById(message.game_id);
    if (!session) throw new Error("No session found with id " + message.game_id);
    const m = ServerChatMessage.fromJson(message.data);
    m.sessionId = session._id;
    m.senderId = ws.user._id;
    m.timestamp = new Date();
    if (Array.isArray(m.targets) && m.targets.length > 0) {
        WebSocketUser.sendToTheDM(session, message, ws);
    } else {
        delete m.targets;
        WebSocketUser.sendToGameSession(session, m.toJson(), ws);
    }
    await MongoController.insert(ChatMessageDB.DB_NAME, [m.toJson()]);
}