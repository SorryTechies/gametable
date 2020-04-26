/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleItem from "./RuleItem";
import RuleArmorType from "../constants/RuleArmorType";

export default class RuleWearable extends RuleItem {
    constructor(key) {
        super(key);
        this.maxHealth = 20;
        this.hardeness = 10;
        this.isWearable = true;
        this.proficiency = RuleArmorType.LIGHT;
        this.allowedSlots = [];
    }

    static fromJson(json) {
        const item = new RuleWearable(json.key);
        if (json.id) item.id = json.id;
        if (json.damaged) item.damaged = json.damaged;
        if (json.slot) item.slot = json.slot;
        return item;
    }
}