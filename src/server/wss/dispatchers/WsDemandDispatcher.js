/**
 * Created by LastBerserk on 02.02.2020.
 */

import WebSocketUser from "../WebSocketUser";
import GameSessionDB from "../../mongo/classes/GameSessionDB";

export async function onDMDemand(message, ws) {
    const session = await GameSessionDB.getById(message.game_id);
    const participants = message.data.participants;
    delete message.data.participants;
    if (Array.isArray(participants) && participants.length > 0) {
        WebSocketUser.sendToUsers(message, participants.filter(id => session.participants_character_id.includes(id)), ws);
    } else {
        WebSocketUser.sendToGameSession(session, message, ws);
    }
}