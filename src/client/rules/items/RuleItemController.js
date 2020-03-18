/**
 * Created by LastBerserk on 18.03.2020.
 */

import RuleItemFactory from "./RuleItemFactory";
import RuleItemSlots from "./RuleItemSlots";

export default class RuleItemController {
    constructor(obj, arr) {
        if (!obj) throw new Error("No game object provided.");
        /** @type {RuleGameObject} */
        this.gameObject = obj;
        this.slots = new RuleItemSlots(obj);
        if (Array.isArray(arr)) {
            /** @type {Array<RuleItem>} */
            this.items = arr;
            this.items.forEach(item => {
                if (typeof item.slot === "number") {
                    this.slots.equip(item);
                }
            });
        } else {
            /** @type {Array<RuleItem>} */
            this.items = [];
        }

    }

    addItem(item) {
        if (this.items.includes(item)) throw new Error("Character already has this item.");
        this.items.push(item);
    }

    equipItem(item, slot) {
        this.slots.equip(item, slot);
    }

    static fromJson(arr) {
        if (!Array.isArray(arr)) throw new Error("Malformed json.");
        return new RuleItemController(arr.map(RuleItemFactory.fromJson));
    }
}