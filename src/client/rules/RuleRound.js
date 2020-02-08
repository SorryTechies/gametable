/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleCharacter from "./RuleCharacter";
import RuleActionList from "./RuleActionList";

class RoundObject {
    constructor(character) {
        this.character = character;
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
        const obj = this.stack.find(obj => obj.character._id === id);
        if (!obj) throw new Error("Character not found in stack");
        return obj;
    }

    /**
     * @param {RuleActions} action
     */
    addAction(action) {
        this.getObject(action.performerId).actionList.addAction(action);
    }

    /**
     * @param {RuleActions} action
     */
    removeAction(action) {
        this.getObject(action.performerId).actionList.removeAction(action);
    }
}