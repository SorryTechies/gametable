/**
 * Created by LastBerserk on 17.01.2020.
 */

export default class RuleEffectController {
    constructor(type) {
        this.type = type;
        this.arr = [];
    }

    add(effect) {
        this.arr.push(effect);
    }

    remove(effect) {
        this.arr.splice(this.arr.findIndex(item => item === effect), 1);
    }

    getMaxValue(key) {
        return this.arr.reduce((acc, item) => (item.key === key ? (acc < item.val ? item.val : acc) : acc), 0);
    }

    getSum(key) {
        return this.arr.reduce((acc, item) => item.key === key ? acc + item.val : acc, 0);
    }
}