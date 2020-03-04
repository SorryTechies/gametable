/**
 * Created by LastBerserk on 17.01.2020.
 */

import RuleDefaultValues from "./RuleDefaultValues";

export default class RuleCharacter {
    constructor(character) {
        this.id = character._id;
        this.name = character.name;
        this.feats = Array.isArray(character.feats) ? character.feats : [];
        if (character.data) {
            this.data = character.data;
        } else {
            this.data = {};
        }
        RuleDefaultValues.setDefault(this);
    }

    set(key, val) {
        if (key) this.data[key] = val;
    }

    get(key) {
        return this.data[key];
    }
}