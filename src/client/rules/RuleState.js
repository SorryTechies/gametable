/**
 * Created by LastBerserk on 18.01.2020.
 */

import RuleConstants from "./constants/RuleStatConstants";
import RuleBuffConstants from "./constants/RuleBuffConstants";
import RuleBuff from "./RuleBuff";
import * as EFF from "./impl/RuleEffectImpl";
import RuleSkillConstants from "./constants/RuleSkillConstants";
import * as SUPP from "./constants/RuleSkillSupportConst";
import TAGS from "./constants/RuleWeaponTags";
import BUFF from "./constants/RuleBuffConstants";
import {getRankKey} from "./constants/RuleSkillSupportConst";
import FEATS from "./constants/RuleFeatsConstants";
import RuleItemToBuff from "./items/RuleItemToBuff";

function dummyAction(target, additional) {
    return {
        performerObject: target,
        additional1: additional
    };
}

function getBuff(key, action, dispellable) {
    const buff = new RuleBuff(key);
    buff.dispellable = !!dispellable;
    buff.setTarget(action.performerObject);
    return buff;
}

function finalize(buff) {
    RuleState.onBuffSetup(buff);
    buff.gameObject.buffs.addDM(buff);
}

export default class RuleState {
    static doRage(action) {
        const buff = getBuff(RuleBuffConstants.RAGE, action, true);
        buff.duration = 4 + action.performerObject.get(RuleConstants.MOD_CONSTITUTION) + (action.performerObject.get(RuleConstants.LEVEL) - 1) * 2;
        buff.effects = EFF.getRageEffect();
        buff.effects[0].val = 4;
        buff.effects[1].val = 4;
        finalize(buff);
    }

    static doFatigue(action) {
        const buff = getBuff(RuleBuffConstants.FATIGUE, action);
        buff.duration = action.additional1 * 2;
        buff.effects = EFF.getFatigueEffect();
        buff.effects[0].val = 4;
        buff.effects[1].val = 4;
        finalize(buff);
    }

    static doBlindSetup(action, duration) {
        const buff = getBuff(RuleBuffConstants.BLINDED, action);
        buff.duration = duration;
        buff.effects = EFF.getBlindedEffects();
        buff.effects[0].val = -2;
        buff.effects[1].val = -4;
        buff.effects[2].val = -4;
        finalize(buff);
    }

    static doTotalDefenceState(action) {
        const buff = getBuff(RuleBuffConstants.TOTAL_DEFENSE, action);
        buff.duration = 1;
        buff.effects = [EFF.getTotalDefenceAC()];
        buff.effects[0].val = buff.gameObject.get(getRankKey(RuleSkillConstants.SKILL_ACROBATICS)) >= 3 ? 6 : 4;
        action.isSuccessfull = true;
        finalize(buff);
    }

    static doChargeState(action) {
        const buff = getBuff(RuleBuffConstants.CHARGE, action);
        buff.duration = 1;
        buff.effects = [EFF.getChargeAC(), EFF.getChargeAttack()];
        buff.effects[0].val = -2;
        buff.effects[1].val = 2;
        finalize(buff);
    }

    static activateCombatExpertise(action) {
        const buff = getBuff(RuleBuffConstants.COMBAT_EXPERTISE, action, true);
        buff.effects = [EFF.getCombatExpertiseAC(), EFF.getCombatExpertiseAttack()];
        const bab = buff.gameObject.get(RuleConstants.BAB) >= 4;
        buff.effects[0].val = bab ? 2 : 1;
        buff.effects[1].val = bab ? -2 : -1;
        finalize(buff);
    }

    static activateFightingDefensively(action) {
        const buff = getBuff(RuleBuffConstants.FIGHTING_DEFENSIVELY, action, true);
        buff.effects = [EFF.getFightingDefenseAC(), EFF.getFightingDefenseAttack()];
        buff.effects[0].val = buff.gameObject.get(SUPP.getRankKey(RuleSkillConstants.SKILL_ACROBATICS)) >= 3 ? 3 : 2;
        if (buff.gameObject.items.slots.equipmentHasTag(TAGS.BLOCKING)) ++buff.effects[0].val;
        buff.effects[1].val = -4;
        finalize(buff);
    }

    static removeState(target, key) {
        const buff = target.performerObject.buffs.getBuff(key);
        if (buff) finalize(buff);
    }

    static removeStateAction(action) {
        RuleState.removeState(action.performerObject, action.additional1.key);
    }

    static itemBuffImpl(action) {
        const key = action.targetItem.key;
        const onEquipFunc = RuleItemToBuff.onEquip[key];
        if (typeof onEquipFunc === "function") {
            const buff = getBuff(key, action);
            onEquipFunc(buff);
            finalize(buff);
        } else {
            console.warn("No implementation found for " + key);
        }
    }

    static onBuffSetup(buff) {
        switch (buff.key) {
            case BUFF.RAGE:
                buff.onEnd = RuleState.doFatigue.bind(null, dummyAction(buff.gameObject, buff.additional1));
                break;
        }
    }
}