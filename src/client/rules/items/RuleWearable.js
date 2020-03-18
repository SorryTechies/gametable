/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleItem from "./RuleItem";
import RuleWearSlots from "./const/RuleWearSlots";

export default class RuleWearable extends RuleItem {
    constructor(key) {
        super(key);
        this.isWearable = true;
    }

    static fromJson(json) {
        const item = new RuleWearable(json.key);
        item.health = json.health;
        item.slot = json.slot;
        return item;
    }
}