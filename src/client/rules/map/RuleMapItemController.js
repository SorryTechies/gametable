/**
 * Created by LastBerserk on 19.04.2020.
 */

import RuleItemFactory from "../items/RuleItemFactory";

export default class MapItemController {
    constructor() {
        /** @type {Array.<{position: {x: number, y: number}, item: RuleItem}>} */
        this.items = [];
    }

    /**
     * @param {RuleItem} item
     * @param {{x: number, y: number}} position
     */
    push(item, position) {
        this.items.push({position: position, item: item});
    }

    /** @param {RuleItem} item */
    remove(item) {
        const index = this.items.findIndex(obj => obj.item.id === item.id);
        if (index !== -1) this.items.splice(index, 1);
    }

    /** @param {SessionMapBean} json */
    processJson(json) {
        json.items.forEach(db => this.push(RuleItemFactory.fromJson(db.item), db.position));
    }
}