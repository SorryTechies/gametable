/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWearable from "./RuleWearable";

export default class RuleShield extends RuleWearable {
    constructor(key) {
        super(key);
        this.isShield = true;
    }

    static fromJson(json) {
        const item = new RuleShield(json.key);
        item.id = json.id;
        item.health = json.health;
        item.slot = json.slot;
        return item;
    }
}