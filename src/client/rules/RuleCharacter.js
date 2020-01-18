/**
 * Created by LastBerserk on 17.01.2020.
 */

import RuleEffectController from "./RuleEffectController";
import RuleEffect from "./RuleEffect";
import RuleDefaultValues from "./RuleDefaultValues";
import RuleBuffController from "./RuleBuffController";
import * as RuleImplementation from "./RuleImplementation";

function getBuffArr(self, type) {
    switch (type) {
        case RuleEffect.TYPE_ENCHANTED:
            return self.ench;
        case RuleEffect.TYPE_MORALE:
            return self.morale;
        case RuleEffect.TYPE_OTHER:
            return self.other;
        default:
            throw new Error("Unknown buff type " + type);
    }
}

function getBuffBonus(self, key) {
    return self.ench.getMaxValue(key) + self.morale.getMaxValue(key) + self.other.getSum(key);
}

export default class RuleCharacter {
    constructor() {
        this.originalData = {};
        this.data = {};
        this.ench = new RuleEffectController(RuleEffect.TYPE_ENCHANTED);
        this.morale = new RuleEffectController(RuleEffect.TYPE_MORALE);
        this.other = new RuleEffectController(RuleEffect.TYPE_OTHER);
        this.buff = new RuleBuffController(this);
        RuleDefaultValues.setDefault(this);
    }

    setOriginal(key, val) {
        if (key && typeof val === "number") this.originalData[key] = val;
    }

    set(key, val) {
        if (key && typeof val === "number") this.data[key] = val;
    }

    get(key) {
        return this.data[key] + getBuffBonus(this, key);
    }

    addEffect(effect) {
        getBuffArr(this, effect.type).add(effect);
    }

    removeEffect(effect) {
        getBuffArr(this, effect.type).remove(effect);
    }

    addBuff(buff) {
        this.buff.add(buff);
    }

    removeBuff(buff) {
        this.buff.remove(buff);
    }

    dispelBuff(key) {
        this.buff.removeByKey(key);
    }

    recalculate() {
        this.data = Object.keys(this.originalData).reduce((acc, key) => {
            acc[key] = this.originalData[key];
            return acc;
        }, {});
        RuleImplementation.statCalc(this);
        RuleImplementation.dodgeCalc(this);
        RuleImplementation.attackBonusCalc(this);
        RuleImplementation.defenceCalc(this);
        RuleImplementation.saveCalc(this);
        RuleImplementation.healthCalc(this);
        RuleImplementation.combatManeuverCalc(this);
    }
}