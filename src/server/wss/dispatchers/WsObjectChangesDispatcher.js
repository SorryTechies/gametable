/**
 * Created by LastBerserk on 13.02.2020.
 */

import GameObjectDB from "../../mongo/classes/GameObjectDB";
import MongoController from "../../mongo/MongoController";
import GameSessionDB from "../../mongo/classes/GameSessionDB";
import WebSocketUser from "../WebSocketUser";
import WebSocketMessage from "../../../common/logic/WebSocketMessage";

/**
 *
 * @param {RuleCharacterChangesBeanSup} objects
 * @param ws
 * @return {Promise.<void>}
 */
export async function onGameObjectChange(objects, ws) {
    let sessions = [];
    for (let i = 0; i < objects.length; i++) {
        const gameObject = objects[i];
        const db = await GameObjectDB.getById(gameObject.id);
        if (!db) throw new Error("No game object with id " + gameObject.id + " found.");
        const mod = gameObject.mod;
        if (mod.data) {
            if (!db.data) db.data = {};
            Object.keys(mod.data).forEach(key => {
                if (key !== "_id") {
                    if (typeof db.data[key] === "number") {
                        db.data[key] += mod.data[key]
                    } else {
                        db.data[key] = mod.data[key]
                    }
                }
            });
        }
        if (mod.position) db.position = mod.position;
        if (!db.buffs) db.buffs = {};
        if (mod.buffs) {
            Object.values(mod.buffs).forEach(buff => {
                if (buff.duration === 0) {
                    delete db.buffs[buff.key];
                } else {
                    db.buffs[buff.key] = buff;
                }
            });
        }
        if (mod.initiative) db.initiative = mod.initiative;
        if (mod.name) db.name = mod.name;
        await MongoController.update(GameObjectDB.DB_NAME, {"_id": db._id}, db);
        sessions = sessions.concat(await GameSessionDB.findGameSessionsByGameObject(gameObject.id));
    }
    const message = new WebSocketMessage(WebSocketMessage.TYPE_OBJECT, objects);
    sessions.forEach(session => WebSocketUser.sendToGameSession(session, message, ws));
}