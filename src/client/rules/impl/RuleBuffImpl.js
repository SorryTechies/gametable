/**
 * Created by LastBerserk on 07.03.2020.
 */

import * as EFF from "./RuleEffectImpl";
import FEATS from "../constants/RuleFeatsConstants";

export function armorBuff(itemName, val, penalty, arcana, dex, buff) {
    buff.effects = [EFF.getArmorEffect(itemName, val)];
    if (penalty) {
        let pen = penalty;
        if (buff.gameObject.ruleCharacter.hasFeat(FEATS.ARMOR_EXPERT_TRAIT)) --pen;
        if (pen > 0) buff.effects.push(EFF.getArmorPenalty(itemName, penalty));
    }
    if (arcana) buff.effects.push(EFF.getArcanaFailChance(itemName, arcana));
    if (dex) buff.effects.push(EFF.getMaxAgility(itemName, dex));
}

export function dexBuff(itemName, buff, val) {
    buff.effects = [EFF.getDexEffect(itemName, val)];
}

export function shieldBuff(itemName, val, penalty, arcana, dex, buff) {
    buff.effects = [EFF.getShieldEffect(itemName, val)];
    if (penalty)  buff.effects.push(EFF.getArmorPenalty(itemName, penalty));
    if (arcana)  buff.effects.push(EFF.getArcanaFailChance(itemName, arcana));
    if (dex)  buff.effects.push(EFF.getMaxAgility(itemName, dex));
}

export function towerShieldBuff(itemName, val, penalty, arcana, dex, buff) {
    buff.effects = [EFF.getShieldEffect(itemName, val), EFF.getAttackModifier(itemName, -2)];
    if (penalty) buff.effects.push(EFF.getArmorPenalty(itemName, penalty));
    if (arcana) buff.effects.push(EFF.getArcanaFailChance(itemName, arcana));
    if (dex) buff.effects.push(EFF.getMaxAgility(itemName, dex));
}