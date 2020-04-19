/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleActionList from "./controllers/RuleActionList";
import * as SUP_CONST from "./constants/RuleActionListSupportConstants";
import ACT_CONST from "./constants/RuleActionsConstants";

class RoundObject {
    constructor(gameObject) {
        this.gameObject = gameObject;
        this.actionList = new RuleActionList(gameObject);
    }
}

export default class RuleRound {
    constructor(characters) {
        /** @type {Array.<RoundObject>} */
        this.stack = characters.map(character => new RoundObject(character));
    }

    /**
     * @param {string} id
     * @return {RoundObject}
     */
    getObject(id) {
        const obj = this.stack.find(obj => obj.gameObject.id === id);
        if (!obj) throw new Error("RuleGameObject not found in stack");
        return obj;
    }

    /** @param {RuleAction} action */
    addAction(action) {
        this.getObject(action.performerId).actionList.addAction(action);
        if (SUP_CONST.REPOSITION_ACTIONS.includes(action.key)) action.performerObject.movePoints.add(action.target);
        if (action.key === ACT_CONST.EQUIP || action.key === ACT_CONST.GRAB) action.performerObject.items.slots.equip(action.targetItem, action.additional1);
        if (action.key === ACT_CONST.UNEQUIP || action.key === ACT_CONST.DROP) action.performerObject.items.slots.unequip(action.additional1);
    }

    /** @param {RuleAction} action */
    removeAction(action) {
        const act = this.getObject(action.performerId).actionList.removeAction(action);
        if (act) {
            if (SUP_CONST.REPOSITION_ACTIONS.includes(act.key)) act.performerObject.movePoints.remove(act.target);
            if (act.key === ACT_CONST.EQUIP || action.key === ACT_CONST.GRAB) action.performerObject.items.slots.unequip(action.additional1);
            if (act.key === ACT_CONST.UNEQUIP || action.key === ACT_CONST.DROP) action.performerObject.items.slots.equip(action.targetItem, action.additional1);
        }
    }

    finish() {
        this.stack.forEach(obj => obj.actionList.executeActions());
        this.stack.forEach(obj => obj.gameObject.recalculate());
    }

    turnBuffs() {
        this.stack.forEach(obj =>  {
            obj.gameObject.buffs.turn();
            obj.gameObject.recalculate();
        });
    }

    reset() {
        this.stack.forEach(obj => obj.actionList.reset());
        this.stack = [];
    }
}