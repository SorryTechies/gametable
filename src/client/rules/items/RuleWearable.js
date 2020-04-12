/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleItem from "./RuleItem";

export default class RuleWearable extends RuleItem {
    constructor(key) {
        super(key);
        this.isWearable = true;
        this.allowedSlots = [];
    }

    static fromJson(json) {
        const item = new RuleWearable(json.key);
        item.id = json.id;
        item.health = json.health;
        item.slot = json.slot;
        return item;
    }
}