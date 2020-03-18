/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleItem from "./RuleItem";

export default class RuleShield extends RuleItem {
    constructor(key) {
        super(key);
        this.isShield = true;
    }

    static fromJson(json) {
        const item = new RuleShield(json.key);
        item.health = json.health;
        item.slot = json.slot;
        return item;
    }
}