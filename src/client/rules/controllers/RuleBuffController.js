/**
 * Created by LastBerserk on 18.01.2020.
 */

import RuleBuff from "../RuleBuff";
import RuleBuffToImpl from "../table/RuleBuffToImpl";
import MalformedJsonError from "../../../common/type/MalformedJsonError";
import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleState from "../RuleState";

export default class RuleBuffController {
    constructor(gameObject) {
        this.gameObject = gameObject;
        this.buffs = {};
        this.hasDispellable = false;
    }

    getBuff(key) {
        return this.buffs[key];
    }

    add(buff) {
        if (!buff instanceof RuleBuff) throw new Error("Object passed isn't buff.");
        buff.gameObject = this.gameObject;
        this.buffs[buff.key] = buff;
        if (buff.dispellable) this.hasDispellable = true;
    }

    addDM(buff) {
        const oldBuff = this.getBuff(buff.key);
        if (oldBuff) {
            oldBuff.onRenew(oldBuff);
        } else {
            buff.start();
        }
        this.add(buff);
        RuleCharacterChangesBean.addBuffModification(this.gameObject, buff.toJson());
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
        if (!Object.values(this.buffs).find(item => item.dispellable)) this.hasDispellable = false;
    }

    removeDM(buff) {
        this.remove(buff);
        buff.end();
        RuleCharacterChangesBean.addBuffModification(this.gameObject, buff.toJson(true));
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
        if (typeof json !== "object") throw new MalformedJsonError();
        Object.values(json).forEach(obj => {
            const buff = RuleBuff.fromJson(obj, this.gameObject);
            if (buff.duration === 0) {
                this.remove(buff);
            } else {
                this.add(buff)
            }
        });
    }

    mountBuffs() {
        Object.values(this.buffs).forEach(buff => {
            RuleState.onBuffSetup(buff);
            buff.effects = this.gameObject.effects.getEffectsForBuff(buff);
            if (buff.dispellable) buff.gameObject.buffs.hasDispellable = true;
        });
    }
}