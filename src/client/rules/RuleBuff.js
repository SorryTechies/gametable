/**
 * Created by LastBerserk on 17.01.2020.
 */

export default class RuleBuff {
    constructor(key, val, type = RuleBuff.TYPE_OTHER) {
        this.key = key;
        this.val = val;
        this.type = type;
    }
}

RuleBuff.TYPE_ENCHANTED = "ench";
RuleBuff.TYPE_MORALE = "morale";
RuleBuff.TYPE_OTHER = "other";