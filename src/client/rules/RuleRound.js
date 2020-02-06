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
     * @param {RuleCharacter} character
     * @return {RoundObject}
     */
    getObject(character) {
        if (!character instanceof RuleCharacter) throw new Error("Character isn't instance of RuleCharacter");
        const obj = this.stack.find(obj => obj.character === character);
        if (!obj) throw new Error("Character not found in stack");
        return obj;
    }

    addAction(character, action) {
        this.getObject(character).actionList.addAction(action);
    }

    removeAction(character, action) {
        this.getObject(character).actionList.removeAction(action);
    }
}