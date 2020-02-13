/**
 * Created by LastBerserk on 14.02.2020.
 */

import StaticController from "../../../static/StaticController";
import WebSocketMessage from "../../../../common/logic/WebSocketMessage";

/** @param {WebSocketMessage} message */
export function handleObjectChange(message) {
    /** @type RuleCharacterChangesBeanSup */
    const beans = message.data;
    if (!Array.isArray(beans)) throw new Error("Wrong bean from server.");
    beans.forEach(bean => {
        const object = StaticController.getObject(bean.id);
        if (!object) return;
        const mod = bean.mod;
        if (mod.data) {
            if (!object.data) db.mod = {};
            Object.keys(mod.data).forEach(key => {
                if (key !== _id) {
                    object.data[key] = object.data[key]
                }
            });
        }
        if (mod.position) object.position = mod.position;
        if (mod.buffs) object.buffs = mod.buffs;
        if (mod.initiative) object.initiative = mod.initiative;
        if (mod.name) object.name = mod.name;
    });
    StaticController.notifySubscribed(WebSocketMessage.TYPE_OBJECT);
}