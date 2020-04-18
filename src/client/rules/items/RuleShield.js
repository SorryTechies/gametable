/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWearable from "./RuleWearable";
import SLOTS from "./const/RuleWearSlots";

export default class RuleShield extends RuleWearable {
    constructor(key) {
        super(key);
        this.isShield = true;
        this.allowedSlots = [SLOTS.LEFT_HAND];
    }

    static fromJson(json) {
        const item = new RuleShield(json.key);
        if (!json.id) throw new Error("No id for item.");
        item.id = json.id;
        if (json.damaged) item.damaged = json.damaged;
        if (json.slot) item.slot = json.slot;
        return item;
    }
}