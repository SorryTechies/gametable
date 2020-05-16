/**
 * Created by LastBerserk on 13.02.2020.
 */

import GameObjectDB from "../../mongo/classes/GameObjectDB";
import MongoController from "../../mongo/MongoController";
import GameSessionDB from "../../mongo/classes/GameSessionDB";
import WebSocketUser from "../WebSocketUser";
import WebSocketMessage from "../../../common/logic/WebSocketMessage";
import RuleWearSlots from "../../../client/rules/items/const/RuleWearSlots";

function processData(db, mod) {
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
}

function processBuffs(db, mod) {
    if (mod.buffs) {
        if (!db.buffs) db.buffs = {};
        Object.values(mod.buffs).forEach(buff => {
            if (buff.duration === 0) {
                delete db.buffs[buff.key];
            } else {
                db.buffs[buff.key] = buff;
            }
        });
    }
}

function processEffects(db, mod) {
    if (Array.isArray(mod.effects)) {
        if (!Array.isArray(db.effects)) db.effects = [];
        db.effects = db.effects.filter(dbEffect =>
            !mod.effects.find(modEffect =>
                modEffect.val === 0 &&
                dbEffect.buffKey === modEffect.buffKey &&
                dbEffect.key === modEffect.key
            ));
        mod.effects.forEach(effect => {
            if (effect.val !== 0) db.effects.push(effect);
        });
    }
}

function processItems(db, mod) {
    if (Array.isArray(mod.items)) {
        if (!Array.isArray(db.items)) db.items = [];
        db.items = db.items.filter(dbItem =>
            !mod.items.find(modItem => modItem.toDelete && modItem.id === dbItem.id));
        mod.items.forEach(item => {
            if (!item.toDelete) {
                /** @type ItemBean */
                const dbItem = db.items.find(dbItem => dbItem.id === item.id);
                if (dbItem) {
                    dbItem.key = item.key;
                    if (typeof item.slot !== "number" || item.slot === RuleWearSlots.NO) {
                        delete dbItem.slot;
                    } else {
                        dbItem.slot = item.slot;
                    }
                    if (typeof item.damaged === "number") {
                        dbItem.damaged = item.damaged;
                    } else {
                        delete dbItem.damaged ;
                    }
                    if (Array.isArray(item.additionalTags) && item.additionalTags.length > 0) {
                        dbItem.additionalTags = item.additionalTags;
                    } else {
                        delete dbItem.additionalTags;
                    }
                } else {
                    db.items.push(item);
                }
            }
        });
    }
}

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
        if (mod.initiative) db.initiative = mod.initiative;
        if (mod.name) db.name = mod.name;
        if (mod.position) db.position = mod.position;
        processData(db, mod);
        processBuffs(db, mod);
        processEffects(db, mod);
        processItems(db, mod);
        await MongoController.update(GameObjectDB.DB_NAME, {"_id": db._id}, db);
        sessions = sessions.concat(await GameSessionDB.findGameSessionsByGameObject(gameObject.id));
    }
    const message = new WebSocketMessage(WebSocketMessage.TYPE_OBJECT, objects);
    sessions.forEach(session => WebSocketUser.sendToGameSession(session, message, ws));
}