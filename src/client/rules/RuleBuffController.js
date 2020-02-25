/**
 * Created by LastBerserk on 18.01.2020.
 */

import RuleBuff from "./RuleBuff";

export default class RuleBuffController {
    constructor(character) {
        this.ruleCharacter = character;
        this.buffs = {};
    }

    getBuff(key) {
        return this.buffs[key];
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