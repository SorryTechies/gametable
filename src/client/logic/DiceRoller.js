/**
 * Created by LastBerserk on 17.02.2019.
 */

export default class DiceRoller {
    constructor(type) {
        if (typeof type !== 'number') this.max = 20; else this.max = type;
        this.lastResult = null;
    }

    roll(bonus) {
        this.lastResult = Math.floor(1 + Math.random() * parseInt(this.max - 1));
        this.calculatedResult = this.lastResult + bonus;
        return this;
    }

    toString(name) {
        let result;
        if (this.lastResult === 20) {
            result = 'critical!';
        } else {
            if (this.lastResult === 1) {
                result = 'failed!';
            } else {
                result = this.calculatedResult;
            }
        }
        return name + " roll " + result;
    }
}