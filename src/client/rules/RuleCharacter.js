/**
 * Created by LastBerserk on 17.01.2020.
 */

import RuleFeatsToState from "./table/RuleFeatsToState";
import RuleBuffConstants from "./constants/RuleBuffConstants";
import RuleDefaultValues from "./RuleDefaultValues";

export default class RuleCharacter {
    constructor(character) {
        this.id = character._id;
        this.name = character.name;
        this.feats = Array.isArray(character.feats) ? character.feats : [];
        this.commandButtonLayout = Array.isArray(character.commandButtonLayout) ? character.commandButtonLayout : [];
        if (character.data) {
            this.data = character.data;
        } else {
            this.data = {};
        }
    }

    set(key, val) {
        if (key) this.data[key] = val;
    }

    get(key) {
        if (this.data[key]) {
            return this.data[key];
        } else {
            return RuleDefaultValues.getDefault(key);
        }
    }

    getStateList() {
        const ans = [RuleBuffConstants.FIGHTING_DEFENSIVELY];
        this.feats.forEach(feat => RuleFeatsToState[feat] ? ans.push(RuleFeatsToState[feat]) : null);
        return ans;
    }

    hasFeat(key) {
        return this.feats.includes(key);
    }
}