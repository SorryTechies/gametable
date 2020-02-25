/**
 * Created by LastBerserk on 18.01.2020.
 */

import RuleBuff from "./RuleBuff";
import RuleEffectController from "./RuleEffectController";
import RuleEffect from "./RuleEffect";

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

export default class RuleBuffController {
    constructor(character) {
        this.ruleCharacter = character;
        this.buffs = {};

        this.ench = new RuleEffectController(RuleEffect.TYPE_ENCHANTED);
        this.morale = new RuleEffectController(RuleEffect.TYPE_MORALE);
        this.luck = new RuleEffectController(RuleEffect.TYPE_LUCK);
        this.other = new RuleEffectController(RuleEffect.TYPE_OTHER);
    }

    getBuff(key) {
        return this.buffs[key];
    }

    getBuffBonus(key) {
        return this.ench.getMaxValue(key) + this.morale.getMaxValue(key) + this.other.getSum(key);
    }

    addEffect(effect) {
        getBuffArr(this, effect.type).add(effect);
    }

    removeEffect(effect) {
        getBuffArr(this, effect.type).remove(effect);
    }

    add(buff) {
        if (!buff instanceof RuleBuff) throw new Error("Object passed isn't buff.");
        const oldBuff = this.getBuff(buff.key);
        if (oldBuff) {
            oldBuff.onRenew();
        } else {
            buff.ruleCharacter = this.ruleCharacter;
            this.buffs[buff.key] = buff;
        }
        buff.onCreate(this);
    }

    removeByKey(str) {
        const buff = this.getBuff(str);
        if (buff) this.remove(buff);
    }

    remove(buff) {
        buff.onEnd();
        delete this.buffs[buff.key];
    }

    turn() {
        Object.values(this.buffs).forEach(item => item.onTurn());
    }
}