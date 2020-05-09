/**
 * Created by LastBerserk on 29.04.2020.
 */

import ACTION from "../constants/RuleActionsConstants";
import CONST from "../constants/RuleStatConstants";
import FEATS from "../constants/RuleFeatsConstants";
import CheckDice from "../../logic/roll/CheckDice";
import * as IMPL from "./RuleFeatsImpl";
import {axeToGrindImpl} from "./RuleFeatsImpl";
import W_PROF from "../constants/RuleWeaponProficiency";

function getSimpleAttackBonus(action) {
    return action.performerObject.get(CONST.ATTACK_FLAT) - action.consecutiveActionPenalty;
}

function getStrengthBonus(action) {
    return action.performerObject.get(CONST.MOD_STRENGTH);
}

function getDexterityBonus(action) {
    return action.performerObject.get(CONST.MOD_DEXTERITY);
}

function getCharismaBonus(action) {
    return action.performerObject.get(CONST.MOD_CHARISMA);
}

function getMeleeAttack(action) {
    const char = action.performerObject.ruleCharacter;
    let bonus = getSimpleAttackBonus(action);
    bonus += getStrengthBonus(action);
    if (char.hasFeat(FEATS.AXE_TO_GRIND)) bonus += axeToGrindImpl(action);
    return bonus;
}

function getRangedAttack(action) {
    const char = action.performerObject.ruleCharacter;
    let bonus = getSimpleAttackBonus(action);
    bonus += getDexterityBonus(action);
    if (char.hasFeat(FEATS.POINT_BLANK_SHOT)) bonus += IMPL.pointBlankShotImpl(action);
    return bonus;
}

function getThrowingAttack(action) {
    const char = action.performerObject.ruleCharacter;
    let bonus = getSimpleAttackBonus(action);
    if (char.hasFeat(FEATS.POINT_BLANK_SHOT)) bonus += IMPL.pointBlankShotImpl(action);
    if (char.hasFeat(FEATS.MIND_ARSENAL)) {
        bonus += getCharismaBonus(action);
    } else {
        bonus += getStrengthBonus(action);
    }
    return bonus;
}

function isProficient(action) {
    const weapon = action.additional1;
    if (action.performerObject.hasWeaponProficiency(W_PROF.ALL)) return true;
    return typeof weapon.proficiency !== "number" ||
        action.performerObject.hasWeaponProficiency(weapon.proficiency);
}

function checkProficiency(action, roll) {
    if (!isProficient(action)) roll.bonus -= 4;
}

export function getRangedAttackRoll(action) {
    const roll = new CheckDice();
    roll.name = "Ranged Attack";
    roll.bonus = getRangedAttack(action);
    checkProficiency(action, roll);
    return roll;
}

export function getMeleeAttackImpl(action) {
    const roll = new CheckDice();
    roll.name = "Melee Attack";
    roll.bonus = getMeleeAttack(action);
    checkProficiency(action, roll);
    return roll;
}

export function getThrowAttack(action) {
    const roll = new CheckDice();
    roll.name = "Throw Attack";
    roll.bonus = getThrowingAttack(action);
    checkProficiency(action, roll);
    return roll;
}

export function getImprovisedAttack(action) {
    const roll = new CheckDice();
    roll.name = "Improvised Attack";
    roll.bonus = action.performerObject.get(CONST.ATTACK_STR);
    checkProficiency(action, roll);
    return roll;
}


