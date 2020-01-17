/**
 * Created by LastBerserk on 17.01.2020.
 */

class RuleBuffController {
    constructor(type) {
        this.type = type;
        this.arr = [];
    }

    add(buff) {
        this.arr.push(buff);
    }

    remove(buff) {
        this.arr.splice(this.arr.findIndex(item => item === buff), 1);
    }

    getMaxValue(key) {
        return this.arr.reduce((acc, item) => (item.key === key ? (acc < item.val ? item.val : acc) : acc), 0);
    }

    getSum(key) {
        return this.arr.reduce((acc, item) => item.key === key ? acc + item.val : acc, 0);
    }
}

module.exports = RuleBuffController;