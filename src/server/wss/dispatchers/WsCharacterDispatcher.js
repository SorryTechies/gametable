/**
 * Created by LastBerserk on 02.02.2020.
 */

import CharacterDB from "../../mongo/classes/CharacterDB";
import MongoController from "../../mongo/MongoController";
import WebSocketUser from "../WebSocketUser";
import WebSocketMessage from "../../../common/logic/WebSocketMessage";
import GameSessionDB from "../../mongo/classes/GameSessionDB";
import {handleCharacterChange} from "../../../common/logic/ws/WsCharacterChangeProcessor";

export async function onCharacterUpdate(characters, ws) {
    let sessions = [];
    for (let i = 0; i < characters.length; i++) {
        const character = characters[i];
        const db = await CharacterDB.getById(character._id);
        if (!db) throw new Error("No character with id " + character._id + " found.");
        handleCharacterChange(db, character);
        await MongoController.update(CharacterDB.DB_NAME, {"_id": db._id}, db);
        sessions = sessions.concat(await GameSessionDB.findSessionsByCharacter(character._id));
    }
    const message = new WebSocketMessage(WebSocketMessage.TYPE_CHARACTER, characters);
    sessions.forEach(session => WebSocketUser.sendToGameSession(session, message, ws));
}