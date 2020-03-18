/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWearSlots from "./const/RuleWearSlots";
export default class RuleItem {
    constructor(key) {
        if (!key) throw new Error("No key for item provided.");
        this.key = key;
        this.weight = 1;
        this.hardeness = 0;
        this.isWearable = false;
        this.isWeapon = false;
        this.isShield = false;
        this.isRanged = false;

        this.health = 1;
        this.slot = RuleWearSlots.NO;
    }

    toJson() {
        return {
            key: this.key,
            health: this.health,
            slot: this.slot
        };
    }

    static fromJson(json) {
       const item = new RuleItem(json.key);
       item.health = json.health;
       item.slot = json.slot;
       return item;
    }
}