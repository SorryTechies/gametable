/**
 * Created by LastBerserk on 17.01.2020.
 */

import RuleEffect from "../buff/RuleEffect";
import RuleEffectTypeConstants from "../constants/RuleEffectTypeConstants";

export default class RuleEffectController {
    constructor(obj) {
        this.gameObject = obj;
        /** @type {Array<RuleEffect>} */
        this.arr = [];
    }

    add(effect) {
        this.arr.push(effect);
    }

    remove(effect) {
        const index = this.arr.findIndex(item => item.key === effect.key && item.buffKey === effect.buffKey);
        if (index !== -1) this.arr.splice(index, 1);
    }

    removeForBuff(buffKey) {
        this.arr = this.arr.filter(item => item.buffKey !== buffKey);
    }

    getBonus(key) {
        const types = [];
        const max = {};
        return this.arr.filter(item => item.key === key).reduce((acc, item) => {
            if (types.includes(item.type)) {
                let val = 0;
                if (max[item.type] < item.val) {
                    val = item.val - max[item.type];
                    max[item.type] = item.val;
                }
                return acc + val;
            } else {
                if (item.type !== RuleEffectTypeConstants.TYPE_OTHER) {
                    types.push(item.type);
                    max[item.type] = item.val;
                }
                return acc + item.val;
            }
        }, 0);
    }

    static fromJson(obj, json) {
        const controller = new RuleEffectController(obj);
        if (Array.isArray(json))  controller.arr = json.map(RuleEffect.fromJson);
        return controller;
    }
}