/**
 * Created by LastBerserk on 18.01.2020.
 */

import RuleEffect from "./buff/RuleEffect";
import RuleConstants from "./constants/RuleStatConstants";
import RuleBuffConstants from "./constants/RuleBuffConstants";
import RuleBuff from "./RuleBuff";
import * as IMPL from "./impl/RuleBuffImpl";

export default class RuleState {
    /** @param {RuleAction} action */
    static doRage(action) {
        const buff = new RuleBuff(RuleBuffConstants.RAGE);
        buff.dispellable = true;
        buff.duration = 4 + action.performerObject.get(RuleConstants.MOD_CONSTITUTION) + (action.performerObject.get(RuleConstants.LEVEL) - 1) * 2;
        buff.setTarget(action.performerObject);
        IMPL.doRageBuff(buff, RuleState.doFatigue.bind(null, action));
        buff.gameObject.buffs.addDM(buff);
    }

    /** @param {RuleAction} action */
    static doFatigue(action) {
        const buff = new RuleBuff(RuleBuffConstants.FATIGUE);
        buff.setTarget(action.performerObject);
        buff.duration = action.additional1 * 2;
        IMPL.doFatigueBuff(action);
        buff.gameObject.buffs.addDM(buff);
    }

    static doBlindSetup(action, duration) {
        const buff = new RuleBuff(RuleBuffConstants.BLINDED);
        buff.setTarget(action.performerObject);
        buff.duration = duration;
        IMPL.doFatigueBuff(action);
        buff.gameObject.buffs.addDM(buff);
    }

    /** @param {RuleAction} action */
    static doTotalDefenceState(action) {
        const buff = new RuleBuff(RuleBuffConstants.TOTAL_DEFENSE);
        buff.duration = 1;
        buff.setTarget(action.performerObject);
        IMPL.totalDefenceImpl(buff);
        buff.gameObject.buffs.addDM(buff);
        action.isSuccessfull = true;
    }

    /** @param {RuleAction} action */
    static doChargeState(action) {
        const buff = new RuleBuff(RuleBuffConstants.CHARGE);
        buff.duration = 1;
        buff.setTarget(action.performerObject);
        IMPL.chargeBuffImpl(buff);
        buff.gameObject.buffs.addDM(buff);
    }

    /** @param {RuleAction} action */
    static activateCombatExpertise(action) {
        const buff = new RuleBuff(RuleBuffConstants.COMBAT_EXPERTISE);
        buff.setTarget(action.performerObject);
        IMPL.combatExpertiseImpl(buff);
        buff.gameObject.buffs.addDM(buff);
    }

    /** param {RuleAction} action */
    static activateFightingDefensively(action) {
        const buff = new RuleBuff(RuleBuffConstants.FIGHTING_DEFENSIVELY);
        buff.setTarget(action.performerObject);
        IMPL.fightingDefensively(buff);
        buff.gameObject.buffs.addDM(buff);
    }

    static removeState(target, key) {
        target.buffs.removeDmByKey(key);
    }

    static removeStateAction(action) {
        RuleState.removeState(action.performerObject, action.additional1.key);
    }
}