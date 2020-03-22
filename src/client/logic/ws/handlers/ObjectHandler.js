/**
 * Created by LastBerserk on 14.02.2020.
 */

import StaticController from "../../../static/StaticController";
import WebSocketMessage from "../../../../common/logic/WebSocketMessage";
import RuleEffect from "../../../rules/buff/RuleEffect";

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
            Object.keys(mod.data).forEach(key => object.addModification(key, mod.data[key]));
        }
        if (mod.position) {
            object.position = mod.position;
            object.movePoints.setStartingPoint(Object.assign({}, mod.position));
        }
        if (Array.isArray(mod.effects)) mod.effects.forEach(item => {
            if (item.val === 0) {
                object.effects.remove(RuleEffect.fromJson(item));
            } else {
                object.effects.add(RuleEffect.fromJson(item));
            }
        });

        if (mod.buffs) object.buffs.processJson(mod.buffs);
        if (mod.initiative) object.initiative = mod.initiative;
        if (mod.name) object.name = mod.name;
    });
    StaticController.notifySubscribed(WebSocketMessage.TYPE_OBJECT);
}