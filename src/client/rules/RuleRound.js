/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleConstants from "./RuleConstants";
import RuleCharacter from "./RuleCharacter";
import RuleActionList from "./RuleActionList";

export default class RuleRound {
    constructor(characters) {
        this.stack = characters.map(character => ({
            character: character,
            actionList: new RuleActionList()
        }));
        this.stack.sort((c1, c2) => c1.character.get(RuleConstants.INITIATIVE) - c2.character.get(RuleConstants.INITIATIVE));
    }

    getObject(character) {
        if (!character instanceof RuleCharacter) throw new Error("Action isn't instance of RuleCharacter");
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