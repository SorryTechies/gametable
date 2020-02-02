/**
 * Created by LastBerserk on 02.02.2020.
 */

import CharacterDB from "../../mongo/classes/CharacterDB";
import MongoController from "../../mongo/MongoController";

export async function onCharacterUpdate(character) {
    const db = await CharacterDB.getById(character._id);
    if (!db) throw new Error("No character with id " + character._id + " found.");
    Object.keys(character.data).forEach(key => db.data[key] = character.data[key]);
    await MongoController.update(CharacterDB.DB_NAME, {"_id": db._id}, db);
    const sessions = await
    await WebSocketUser.sendToGameSession();
}