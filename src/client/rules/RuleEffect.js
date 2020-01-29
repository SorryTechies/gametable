/**
 * Created by LastBerserk on 18.01.2020.
 */

export default class RuleEffect {
    constructor(key, val, type = RuleEffect.TYPE_OTHER) {
        this.key = key;
        this.val = val;
        this.type = type;
    }
}

RuleEffect.TYPE_ENCHANTED = "ench";
RuleEffect.TYPE_MORALE = "morale";
RuleEffect.TYPE_LUCK = "luck";
RuleEffect.TYPE_OTHER = "other";