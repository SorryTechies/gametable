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
        if (json.id) item.id = json.id;
        if (json.damaged) item.damaged = json.damaged;
        if (json.slot) item.slot = json.slot;
        if (Array.isArray(json.additionalTags)) item.additionalTags = json.additionalTags;
        return item;
    }
}