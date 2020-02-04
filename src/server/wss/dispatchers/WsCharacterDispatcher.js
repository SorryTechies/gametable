/**
 * Created by LastBerserk on 02.02.2020.
 */

import CharacterDB from "../../mongo/classes/CharacterDB";
import MongoController from "../../mongo/MongoController";
import WebSocketUser from "../WebSocketUser";
import WebSocketMessage from "../../../common/logic/WebSocketMessage";
import GameSessionDB from "../../mongo/classes/GameSessionDB";

export async function onCharacterUpdate(character, ws) {
    const db = await CharacterDB.getById(character._id);
    if (!db) throw new Error("No character with id " + character._id + " found.");
    Object.keys(character).forEach(key => db.data[key] = character[key]);
    await MongoController.update(CharacterDB.DB_NAME, {"_id": db._id}, db);
    const message = new WebSocketMessage(WebSocketMessage.TYPE_CHARACTER, character);
    const sessions = await GameSessionDB.findSessionsByCharacter(character._id);
    sessions.forEach(session =>  WebSocketUser.sendToGameSession(session, message, ws));
}