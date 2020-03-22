/**
 * Created by LastBerserk on 07.03.2020.
 */

import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleSkillConstants from "../constants/RuleSkillConstants";
import RuleConstants from "../constants/RuleStatConstants";
import {
    getChargeAC, getChargeAttack, getCombatExpertiseAC, getCombatExpertiseAttack, getFightingDefenseAC,
    getFightingDefenseAttack,
    getTotalDefenceAC
} from "./RuleEffectImpl";

function notifyBuffs(buff) {
    RuleCharacterChangesBean.addBuffModification(buff.gameObject, buff.toJson());
}

function notifyEffects(obj, effect) {
    RuleCharacterChangesBean.addEffectInstantly(obj, effect.toJson());
}

function notifyEffectDeletion(obj, effect) {
    RuleCharacterChangesBean.addEffectInstantly(obj, effect.toJson(true));
}

function notifyBuffAndEffect(buff, effect) {
    notifyBuffs(buff);
    notifyEffects(buff.gameObject, effect);
}

function notifyBuffDeletion(buff) {
    RuleCharacterChangesBean.addBuffModification(buff.gameObject, buff.toJson(true));
}

function notifyDeletion(buff, effect) {
    notifyBuffDeletion(buff);
    notifyEffectDeletion(buff.gameObject, effect);
}

export function totalDefenceImpl(buff) {
    const effect = getTotalDefenceAC();
    buff.onCreate = () =>  {
        effect.val = buff.gameObject.get(RuleSkillConstants.SKILL_ACROBATICS_RANKS) >= 3 ? 6 : 4;
        notifyBuffAndEffect(buff, effect);
    };
    buff.onEnd = () => notifyDeletion(buff, effect);
}

export function chargeBuffImpl(buff) {
    const effectAC = getChargeAC();
    const effectAttack = getChargeAttack();
    buff.onCreate = () =>  {
        effectAC.val = -2;
        effectAttack.val = 2;
        notifyBuffs(buff);
        notifyEffects(buff.gameObject, effectAC);
        notifyEffects(buff.gameObject, effectAttack);
    };
    buff.onEnd = () => {
        notifyBuffDeletion(buff);
        notifyEffectDeletion(buff.gameObject, effectAC);
        notifyEffectDeletion(buff.gameObject, effectAttack);
    };
}

export function combatExpertiseImpl(buff) {
    buff.dispellable = true;
    const effectAC = getCombatExpertiseAC();
    const effectAttack = getCombatExpertiseAttack();
    buff.onCreate = () =>  {
        const bab =  buff.gameObject.get(RuleConstants.BAB) >= 4;
        effectAC.val = bab ? 2 : 1;
        effectAttack.val =  bab ? -2 : -1;
        notifyBuffs(buff);
        notifyEffects(buff.gameObject, effectAC);
        notifyEffects(buff.gameObject, effectAttack);
    };
    buff.onEnd = () => {
        notifyBuffDeletion(buff);
        notifyEffectDeletion(buff.gameObject, effectAC);
        notifyEffectDeletion(buff.gameObject, effectAttack);
    };
}

export function fightingDefensively(buff) {
    buff.dispellable = true;
    const effectAC = getFightingDefenseAC();
    const effectAttack = getFightingDefenseAttack();
    buff.onCreate = () =>  {
        effectAC.val = buff.gameObject.get(RuleSkillConstants.SKILL_ACROBATICS_RANKS) >= 3 ? 3 : 2;
        effectAttack.val = -4;
        notifyBuffs(buff);
        notifyEffects(buff.gameObject, effectAC);
        notifyEffects(buff.gameObject, effectAttack);
    };
    buff.onEnd = () => {
        notifyBuffDeletion(buff);
        notifyEffectDeletion(buff.gameObject, effectAC);
        notifyEffectDeletion(buff.gameObject, effectAttack);
    };
}

export function grappled(buff) {

}