/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleActionList from "./controllers/RuleActionList";
import * as RuleActionListSupportConstants from "./constants/RuleActionListSupportConstants";

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

    /**
     * @param {RuleAction} action
     */
    addAction(action) {
        this.getObject(action.performerId).actionList.addAction(action);
        if (RuleActionListSupportConstants.REPOSITION_ACTIONS.includes(action.key)) action.performerObject.movePoints.add(action.target);
    }

    /**
     * @param {RuleAction} action
     */
    removeAction(action) {
        const act = this.getObject(action.performerId).actionList.removeAction(action);
        if (act && RuleActionListSupportConstants.REPOSITION_ACTIONS.includes(act.key)) act.performerObject.movePoints.remove(act.target);
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