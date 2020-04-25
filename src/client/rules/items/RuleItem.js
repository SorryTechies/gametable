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
        this.maxHealth = 1;
        this.hardeness = 0;
        this.isItem = true;
        this.isWearable = false;
        this.isWeapon = false;
        this.isShield = false;
        this.isRanged = false;
        this.onUse = RuleItem.EMPTY_FUNC;

        this.damaged = 0;
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
        const obj = {
            id: this.id,
            key: this.key
        };
        if (this.damaged) obj.damaged = this.damaged;
        if (this.isEquipped()) obj.slot = this.slot;
        if (toDelete) obj.toDelete = toDelete;
        return obj;
    }

    static fromJson(json) {
       const item = new RuleItem(json.key);
       if (json.id) item.id = json.id;
       if (json.damaged) item.damaged = json.damaged;
       if (json.slot) item.slot = json.slot;
       return item;
    }
}

RuleItem.EMPTY_FUNC = () => {};