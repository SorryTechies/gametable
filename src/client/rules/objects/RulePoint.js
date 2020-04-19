/**
 * Created by LastBerserk on 11.04.2020.
 */

export default class RulePoint {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
        } else {
            if (typeof x === "number") this.x = x;
            if (typeof y === "number") this.y = y;
        }
    }

    add(x, y) {
        if (typeof x === "object") {
            this.x += x.x;
            this.y += x.y;
            return;
        }
        if ((typeof x !== "number" || isNaN(x)) && (typeof y !== "number" || isNaN(y)))
            throw new Error("Parameters should be number or RulePoint.");
        this.x += x;
        this.y += y;
    }

    equal(x, y) {
        if (typeof x === "object") return this.x === x.x && this.y === x.y;
        if ((typeof x !== "number" || isNaN(x)) && (typeof y !== "number" || isNaN(y)))
            throw new Error("Parameters should be number or RulePoint.");
        return this.x === x && this.y === y;
    }
}