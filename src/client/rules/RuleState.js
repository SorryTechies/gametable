/**
 * Created by LastBerserk on 18.01.2020.
 */

import RuleEffect from "./RuleEffect";
import RuleConstants from "./RuleConstants";
import RuleSkillConstants from "./constants/RuleSkillConstants";
import RuleCharacterChangesBean from "./RuleCharacterChangesBean";
import RuleBuffConstants from "./constants/RuleBuffConstants";
import RuleBuff from "./RuleBuff";
import {chargeBuffImpl, combatExpertiseImpl, fightingDefensively, totalDefenceImpl} from "./impl/RuleBuffImpl";

function notifyBuffs(buff) {
    RuleCharacterChangesBean.addBuffModification(buff.targetId, buff.toJson());
}

function notifyDeletion(buff) {
    RuleCharacterChangesBean.addBuffModification(buff.targetId, buff.toJson(true));
}


export default class RuleState {
    /**
     * @param {RuleAction} action
     */
    static doRage(action) {
        const buff = new RuleBuff(RuleBuffConstants.RAGE);
        // TODO add duration
        buff.gameObject = action.performerObject;
        const buffs = buff.gameObject.buffs;
        buff.onCreate = () => {
            RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject, RuleConstants.STAT_STRENGTH, 4);
            RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject, RuleConstants.STAT_DEXTERITY, 4);
            notifyBuffs(buff);
            buff.gameObject.recalculate();
        };
        buff.onEnd = () => {
            RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject, RuleConstants.STAT_STRENGTH, -4);
            RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject, RuleConstants.STAT_DEXTERITY, -4);
            notifyDeletion(buff);
            RuleState.doFatigue(action);
        };
        buffs.addDM(buff);
    }

    /**
     * @param {RuleAction} action
     * @param {RuleBuff} buff
     */
    static doFatigue(action, buff) {
        // TODO add duration
        buff.gameObject = action.performerObject;
        const buffs = buff.gameObject.buffs;
        const strEffect = new RuleEffect(RuleConstants.STAT_STRENGTH, -2);
        const dexEffect = new RuleEffect(RuleConstants.STAT_DEXTERITY, -2);
        buff.onCreate = () => {
            buffs.addEffect(strEffect);
            buffs.addEffect(dexEffect);
        };
        buff.onEnd = () => {
            buffs.removeEffect(strEffect);
            buffs.removeEffect(dexEffect);
        };
        buffs.add(buff);
        notifyBuffs(action, buff);
    }

    /** @param {RuleAction} action */
    static doTotalDefenceState(action) {
        const buff = new RuleBuff(RuleBuffConstants.TOTAL_DEFENSE);
        buff.duration = 1;
        buff.setTarget(action.performerObject);
        totalDefenceImpl(buff);
        buff.gameObject.buffs.addDM(buff);
    }

    /** @param {RuleAction} action */
    static doChargeState(action) {
        const buff = new RuleBuff(RuleBuffConstants.CHARGE);
        buff.duration = 1;
        buff.setTarget(action.performerObject);
        chargeBuffImpl(buff);
        buff.gameObject.buffs.addDM(buff);
    }

    /** @param {RuleAction} action */
    static activateCombatExpertise(action) {
        const buff = new RuleBuff(RuleBuffConstants.COMBAT_EXPERTISE);
        buff.setTarget(action.performerObject);
        combatExpertiseImpl(buff);
        buff.gameObject.buffs.addDM(buff);
    }

    /** param {RuleAction} action */
    static activateFightingDefensively(action) {
        const buff = new RuleBuff(RuleBuffConstants.FIGHTING_DEFENSIVELY);
        buff.setTarget(action.performerObject);
        fightingDefensively(buff);
        buff.gameObject.buffs.addDM(buff);
    }

    static removeState(target, key) {
        target.buffs.removeDmByKey(key);
    }

    static removeStateAction(action) {
        RuleState.removeState(action.performerObject, action.additional1);
    }
}