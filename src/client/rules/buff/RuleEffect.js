/**
 * Created by LastBerserk on 18.01.2020.
 */

import RuleEffectTypeConstants from "../constants/RuleEffectTypeConstants";

export default class RuleEffect {
    constructor(buffKey, key, val, type = RuleEffectTypeConstants.TYPE_OTHER) {
        this.buffKey = buffKey;
        this.key = key;
        this.val = val;
        this.type = type;
    }

    toJson(isDeletion) {
        return {
            buffKey: this.buffKey,
            key: this.key,
            val: isDeletion ? 0 : this.val,
            type: this.type
        };
    }

    static fromJson(json) {
        return new RuleEffect(json.buffKey, json.key, json.val, json.type);
    }
}