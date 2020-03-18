/**
 * Created by LastBerserk on 18.03.2020.
 */

import RuleWearSlots from "./const/RuleWearSlots";

function getSlotObject() {
    return Object.values(RuleWearSlots).reduce((acc, slot) => {
        acc[slot] = null;
        return acc;
    },{});
}

export default class RuleItemSlots {
    constructor(obj) {
        if (!obj) throw new Error("No game object provided.");
        /** @type {RuleGameObject} */
        this.gameObject = obj;
        this.slots = getSlotObject();
    }

    getSlot(slot) {
        return this.slots[slot];
    }

    equip(item, slot) {
        if (this.getSlot(slot)) throw new Error("There is already item in this slot.");
        item.slot = slot;
        this.slots[slot] = item;
    }

    unequip(slot) {
        const item = this.getSlot(slot);
        if (item) {
            item.slot = RuleWearSlots.NO;
            this.slots[slot] = null;
        }
    }
}