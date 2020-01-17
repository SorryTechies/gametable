/**
 * Created by LastBerserk on 17.01.2020.
 */

const RuleBuff = require("./RuleBuff");
const RuleBuffController = require("./RuleBuffController");
const RuleDefaultValues = require("./RuleDefaultValues");

function getBuffArr(self, type) {
    switch (type) {
        case RuleBuff.TYPE_ENCHANTED:
            return self.ench;
        case RuleBuff.TYPE_MORALE:
            return self.morale;
        case RuleBuff.TYPE_OTHER:
            return self.other;
        default:
            throw new Error("Unknown buff type " + type);
    }
}

function getBuffBonus(self, key) {
    return self.ench.getMaxValue(key) + self.morale.getMaxValue(key) + self.other.getSum(key);
}

class RuleCharacter {
    constructor() {
        this.data = {};
        this.ench = new RuleBuffController(RuleBuff.TYPE_ENCHANTED);
        this.morale = new RuleBuffController(RuleBuff.TYPE_MORALE);
        this.other = new RuleBuffController(RuleBuff.TYPE_OTHER);
        RuleDefaultValues.setDefault(this);
    }

    set(key, val) {
        if (key && typeof val === "number") this.data[key] = val;
    }

    get(key) {
        return this.data[key] + getBuffBonus(this, key);
    }

    addBuff(buff) {
        getBuffArr(this, buff.type).add(buff);
    }

    removeBuff(buff) {
        getBuffArr(this, buff.type).remove(buff);
    }
}

module.exports = RuleCharacter;