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
        case RuleEffect.TYPE_LUCK:
            return self.luck;
        default:
            throw new Error("Unknown buff type " + type);
    }
}

function getBuffBonus(self, key) {
    return self.ench.getMaxValue(key) + self.morale.getMaxValue(key) + self.other.getSum(key);
}

export default class RuleCharacter {
    constructor(character) {
        this.id = character._id;
        this.name = character.name;
        if (character.data) {
            this.originalData = character.data;
        } else {
            this.originalData = {};
        }
        RuleDefaultValues.setDefault(this);
        this.data = {};
        this.ench = new RuleEffectController(RuleEffect.TYPE_ENCHANTED);
        this.morale = new RuleEffectController(RuleEffect.TYPE_MORALE);
        this.luck = new RuleEffectController(RuleEffect.TYPE_LUCK);
        this.other = new RuleEffectController(RuleEffect.TYPE_OTHER);
    }

    setOriginal(key, val) {
        if (key) this.originalData[key] = val;
    }

    getOriginal(key) {
        return this.originalData[key];
    }

    set(key, val) {
        if (key) this.data[key] = val;
    }

    get(key) {
        if (typeof this.data[key] === "number") return this.data[key] + getBuffBonus(this, key);
        return this.data[key];
    }

    addEffect(effect) {
        getBuffArr(this, effect.type).add(effect);
    }

    removeEffect(effect) {
        getBuffArr(this, effect.type).remove(effect);
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
        RuleImplementation.skillCalc(this);
    }
}