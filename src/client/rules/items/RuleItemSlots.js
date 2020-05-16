/**
 * Created by LastBerserk on 18.03.2020.
 */

import RuleWearSlots from "./const/RuleWearSlots";
import {equipBuff} from "./RuleItemImpl";
import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleState from "../RuleState";

function getSlotObject() {
    return Object.values(RuleWearSlots).reduce((acc, slot) => {
        acc[slot] = null;
        return acc;
    }, {});
}

function isHandSlot(slot) {
    return slot === RuleWearSlots.RIGHT_HAND || slot === RuleWearSlots.LEFT_HAND;
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

    /**
     * @param {RuleItem} item
     * @param {number} slot
     */
    equip(item, slot) {
        if (this.getSlot(slot)) throw new Error("There is already item in this slot.");
        if (item.isWearable) {
            if (!isHandSlot(slot) && !item.allowedSlots.includes(slot))
                throw new Error("This item cannot be equipped in this slot.");
        } else {
            if (!isHandSlot(slot)) throw new Error("This item cannot be equipped.");
        }
        item.slot = slot;
        this.slots[slot] = item;
    }

    equipDM(action) {
        if (action.targetItem.isWearable && action.targetItem.allowedSlots.includes(action.additional1)) {
            RuleState.itemBuffImpl(action);
        }
        this.gameObject.recalculate();
        if (isHandSlot(action.additional1)) this.gameObject.threatArea.calculate(action.targetItem.reach);
        RuleCharacterChangesBean.addItemModification(this.gameObject, action.targetItem.toJson());
    }


    unequip(slot) {
        const item = this.getSlot(slot);
        if (item) {
            item.slot = RuleWearSlots.NO;
            this.slots[slot] = null;
        }
    }

    unequipDM(item, slot) {
        this.gameObject.buffs.removeDmByKey(item.key);
        this.gameObject.recalculate();
        if (isHandSlot(slot)) this.gameObject.threatArea.calculate();
        RuleCharacterChangesBean.addItemModification(this.gameObject, item.toJson());
    }

    getItems() {
        return Object.values(this.slots).filter(item => !!item);
    }

    getEquipped() {
        return Object.values(this.slots).filter(item => !!item && item.isWearable);
    }

    equipmentHasTag(tag) {
        return Object.values(this.slots).find(item => item && Array.isArray(item.additionalTags) && item.additionalTags.includes(tag));
    }

    getGrabbed() {
        return Object.values(this.slots).filter(item => !!item && isHandSlot(item.slot));
    }
}