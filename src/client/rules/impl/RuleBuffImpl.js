/**
 * Created by LastBerserk on 07.03.2020.
 */

import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleSkillConstants from "../constants/RuleSkillConstants";
import RuleConstants from "../constants/RuleStatConstants";
import * as EFF from "./RuleEffectImpl";
import FEATS from "../constants/RuleFeatsConstants";
import * as SUPP from "../constants/RuleSkillSupportConst";
import TAGS from "../constants/RuleWeaponTags";

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

function setupBuff(buff, effects) {
    buff.onCreate = () => {
        notifyBuffs(buff);
        effects.forEach(notifyEffects.bind(null, buff.gameObject));
    };
    buff.onEnd = () => {
        notifyBuffDeletion(buff);
        effects.forEach(notifyEffectDeletion.bind(null, buff.gameObject));
    };
}

function setupSingleEffect(buff, effect) {
    buff.onCreate = () => {
        notifyBuffs(buff);
        notifyEffects(buff.gameObject, effect);
    };
    buff.onEnd = () => {
        notifyBuffDeletion(buff);
        notifyEffectDeletion(buff.gameObject, effect);
    };
}

export function totalDefenceImpl(buff) {
    const effect = EFF.getTotalDefenceAC();
    buff.onCreate = () =>  {
        effect.val = buff.gameObject.get(RuleSkillConstants.SKILL_ACROBATICS_RANKS) >= 3 ? 6 : 4;
        notifyBuffAndEffect(buff, effect);
    };
    buff.onEnd = () => notifyDeletion(buff, effect);
}

export function chargeBuffImpl(buff) {
    const effectAC = EFF.getChargeAC();
    const effectAttack = EFF.getChargeAttack();
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

export function doRageBuff(buff, fatigueFunc) {
    const arr = EFF.getRageEffect();
    arr[0].val = 4;
    arr[1].val = 4;
    buff.onCreate = () =>  {
        notifyBuffs(buff);
        notifyEffects(buff.gameObject, arr[0]);
        notifyEffects(buff.gameObject, arr[1]);
    };
    buff.onEnd = () => {
        notifyBuffDeletion(buff);
        notifyEffectDeletion(buff.gameObject, arr[0]);
        notifyEffectDeletion(buff.gameObject, arr[1]);
        fatigueFunc();
    };
}

export function doFatigueBuff(buff) {
    const arr = EFF.getFatigueEffect();
    arr[0].val = 4;
    arr[1].val = 4;
    setupBuff(buff, arr);
}

export function doBlinded(buff) {
    const arr = EFF.getBlindedEffects();
    arr[0].val = -2;
    arr[1].val = -4;
    arr[2].val = -4;
    setupBuff(buff, arr);
}

export function combatExpertiseImpl(buff) {
    buff.dispellable = true;
    const effectAC = EFF.getCombatExpertiseAC();
    const effectAttack = EFF.getCombatExpertiseAttack();
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
    const effectAC = EFF.getFightingDefenseAC();
    const effectAttack = EFF.getFightingDefenseAttack();
    buff.onCreate = () =>  {
        effectAC.val = buff.gameObject.get(SUPP.getRankKey(RuleSkillConstants.SKILL_ACROBATICS)) >= 3 ? 3 : 2;
        if (buff.gameObject.items.slots.equipmentHasTag(TAGS.BLOCKING)) ++effectAC.val;
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

export function armorBuff(itemName, val, penalty, arcana, dex, buff) {
    const arr = [EFF.getArmorEffect(itemName, val)];
    if (penalty) {
        let pen = penalty;
        if (buff.gameObject.ruleCharacter.hasFeat(FEATS.ARMOR_EXPERT_TRAIT)) --pen;
        if (pen > 0) arr.push(EFF.getArmorPenalty(itemName, penalty));
    }
    if (arcana) arr.push(EFF.getArcanaFailChance(itemName, arcana));
    if (dex) arr.push(EFF.getMaxAgility(itemName, dex));
    setupBuff(buff, arr);
}

export function dexBuff(itemName, buff, val) {
    setupSingleEffect(buff, EFF.getDexEffect(itemName, val));
}

export function shieldBuff(itemName, val, penalty, arcana, dex, buff) {
    const arr = [EFF.getShieldEffect(itemName, val)];
    if (penalty) arr.push(EFF.getArmorPenalty(itemName, penalty));
    if (arcana) arr.push(EFF.getArcanaFailChance(itemName, arcana));
    if (dex) arr.push(EFF.getMaxAgility(itemName, dex));
    setupBuff(buff, arr);
}

export function towerShieldBuff(itemName, val, penalty, arcana, dex, buff) {
    const arr = [EFF.getShieldEffect(itemName, val), EFF.getAttackModifier(itemName, -2)];
    if (penalty) arr.push(EFF.getArmorPenalty(itemName, penalty));
    if (arcana) arr.push(EFF.getArcanaFailChance(itemName, arcana));
    if (dex) arr.push(EFF.getMaxAgility(itemName, dex));
    setupBuff(buff, arr);
}