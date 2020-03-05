/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleActionList from "./RuleActionList";

class RoundObject {
    constructor(character) {
        this.gameObject = character;
        this.actionList = new RuleActionList();
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
        if (action.isRepositionAction()) action.performerObject.movePoints.add(action.target);
    }

    /**
     * @param {RuleAction} action
     */
    removeAction(action) {
        this.getObject(action.performerId).actionList.removeAction(action);
        if (action.isRepositionAction()) action.performerObject.movePoints.remove(action.target);
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