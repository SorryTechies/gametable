/**
 * Created by LastBerserk on 18.01.2020.
 */

import RuleBuff from "../RuleBuff";
import RuleEffectController from "./RuleEffectController";
import RuleEffect from "../RuleEffect";
import RuleBuffToImpl from "../table/RuleBuffToImpl";

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
        buff.ruleCharacter = this.ruleCharacter;
        this.buffs[buff.key] = buff;
    }

    addDM(buff) {
        const oldBuff = this.getBuff(buff.key);
        if (oldBuff) {
            oldBuff.onRenew(oldBuff);
        } else {
            buff.onCreate(buff);
        }
        this.add(buff);
    }

    getDispellableDebuffs() {
        return Object.values(this.buffs).filter(buff => buff.dispellable);
    }

    removeByKey(str) {
        const buff = this.getBuff(str);
        if (buff) this.remove(buff);
    }

    remove(buff) {
        delete this.buffs[buff.key];
    }

    removeDM(buff) {
        buff.onEnd(buff);
        this.remove(buff);
    }

    removeDmByKey(key) {
        const buff = this.buffs[key];
        if (buff) this.removeDM(buff);
    }

    turn() {
        Object.values(this.buffs).forEach(item => {
            item.onTurn(item);
            if (item.duration !== -1) item.duration -= 1;
            if (item.duration === 0) {
                item.onEnd(item);
                this.remove(item);
            }
        });
    }

    toJson() {
        return Object.values(this.buffs).map(val => val.toJson())
    }

    processJson(json) {
        if (typeof json !== "object") throw new Error("Malformed json in RuleBuffController.");
        Object.values(json).forEach(obj => {
            const buff = RuleBuff.fromJson(obj, this.ruleCharacter);
            if (buff.duration === 0) {
                this.remove(buff);
            } else {
                this.add(buff)
            }
        });
    }

    mountBuffs() {
        Object.values(this.buffs).forEach(buff => {
            const impl = RuleBuffToImpl[buff.key];
            if (typeof impl === "function") impl(buff);
        });
    }
}