/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWearSlots from "./const/RuleWearSlots";
import * as uuid from "uuid";
export default class RuleItem {
    constructor(key) {
        if (!key) throw new Error("No key for item provided.");
        this.id = uuid.v1();
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

    isEquipped() {
        return this.slot !== RuleWearSlots.NO;
    }

    /**
     * @param {boolean} [toDelete]
     * @return {ItemBean}
     */
    toJson(toDelete) {
        return {
            id: this.id,
            key: this.key,
            health: this.health,
            slot: this.slot,
            toDelete: !!toDelete
        };
    }

    static fromJson(json) {
       const item = new RuleItem(json.key);
       item.health = json.health;
       item.slot = json.slot;
       return item;
    }
}