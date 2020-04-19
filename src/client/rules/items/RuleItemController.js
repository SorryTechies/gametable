/**
 * Created by LastBerserk on 18.03.2020.
 */

import RuleItemFactory from "./RuleItemFactory";
import RuleItemSlots from "./RuleItemSlots";
import RuleWearSlots from "./const/RuleWearSlots";
import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleItem from "./RuleItem";

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
                if (item.isEquipped()) this.slots.equip(item, item.slot);
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

    addItemAndNotify(item) {
        RuleCharacterChangesBean.addItemModification(this.gameObject, item.toJson());
    }

    getItemsFromHands() {
        return this.slots.getGrabbed();
    }

    getByID(id) {
        return this.items.find(item => item.id === id);
    }

    removeItem(r) {
        if (r.isEquipped()) this.slots.unequip(r.slot);
        const index = this.items.findIndex(item => item === r);
        if (index !== -1) this.items.splice(index, 1);
    }

    removeItemAdnNotify(item) {
       this.removeItem(item);
        RuleCharacterChangesBean.addItemModification(this.gameObject, item.toJson(true));
    }

    dropItem(itemOrSlot) {
        if (typeof itemOrSlot === "number") itemOrSlot = this.slots.getSlot(itemOrSlot);
        if (!itemOrSlot) throw new Error("No item in slot.");
        if (itemOrSlot.isEquipped()) this.slots.unequip(itemOrSlot.slot);
        // TODO move to map
        this.removeItem(itemOrSlot);
    }

    getBackpack() {
        return this.items.filter(item => item.slot === RuleWearSlots.NO);
    }

    static fromJson(obj, arr) {
        if (!Array.isArray(arr)) throw new Error("Malformed json.");
        return new RuleItemController(obj, arr.map(RuleItemFactory.fromJson));
    }

    /** @param {ItemBean} json */
    processJson(json) {
        const item = this.items.find(item => item.id === json.id);
        if (item) {
            if (json.toDelete) {
                this.removeItem(item);
            } else {
                if (json.damaged) item.damaged = json.damaged;
                if (item.slot !== json.slot) {
                    if (item.isEquipped()) this.slots.unequip(item.slot);
                    this.slots.equip(item, json.slot);
                }
            }
        } else {
            if (json.toDelete) {
                console.warn("Trying to delete missing item.");
            } else {
                const item = RuleItemFactory.fromJson(json);
                this.items.push(item);
                if (json.slot) this.slots.equip(item, json.slot);
            }
        }
    }
}