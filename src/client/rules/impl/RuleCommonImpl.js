/**
 * Created by LastBerserk on 05.03.2020.
 */

import RuleConstants from "../constants/RuleStatConstants";
import RuleFeatsConstants from "../constants/RuleFeatsConstants";
import {axeToGrindImpl} from "./RuleFeatsImpl";
import CheckDice from "../../logic/roll/CheckDice";
import RuleWeaponConstants from "../items/const/RuleWeaponConstants";
import ACTION from "../constants/RuleActionsConstants";
import PROF from "../constants/RuleWeaponProficiency";

export function calculateAttack(action, isRanged) {
    const attacker = action.performerObject;
    let bonus = 0;
    if (isRanged) {
        bonus += attacker.get(RuleConstants.ATTACK_DEX);
    } else {
        bonus += attacker.get(RuleConstants.ATTACK_STR);
        if (action.targetObject) {

            if (attacker.ruleCharacter.hasFeat(RuleFeatsConstants.AXE_TO_GRIND)) bonus += axeToGrindImpl(action)
        }
    }

    return bonus;
}

export function getAttackRoll(action, isRanged) {
    const roll = new CheckDice();
    roll.name = "Attack";
    roll.bonus = calculateAttack(action, isRanged);
    return roll;
}

function isProficient(action) {
    const character = action.performerObject.ruleCharacter;
    const weapon = action.additional1.key;
    if (action.performerObject.get(RuleConstants.WEAPON_PROFICIENCY).includes(PROF.ALL)) return true;
    if (action.key === ACTION.THROW_ATTACK) return !weapon.isThrown || character.hasFeat(RuleFeatsConstants.THROW_ANYTHING);
    if (typeof weapon.proficiency === "number" &&
        !action.performerObject.get(RuleConstants.WEAPON_PROFICIENCY).includes(weapon.proficiency))return false;
    switch (weapon.key) {
        case RuleWeaponConstants.UNARMED_STRIKE:
            return character.hasFeat(RuleFeatsConstants.IMPROVED_UNARMED_STRIKE);
        case RuleWeaponConstants.IMPROVISED:
            return character.hasFeat(RuleFeatsConstants.CATCH_OF_GUARD);
    }
}

export function calculateMoveDistance(p1, p2) {
    return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y)) + Math.floor(Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y)) / 2);
}

export function getRangedAttackRoll(action) {
    const roll = new CheckDice();
    roll.name = "Ranged Attack";
    roll.bonus = action.performerObject.get(RuleConstants.ATTACK_DEX);
    if (action.performerObject.ruleCharacter.hasFeat(RuleFeatsConstants.POINT_BLANK_SHOT)) {
        if (calculateMoveDistance(action.performerObject.position, action.targetObject.position)) {
            ++roll.bonus;
        }
    }
    if (!isProficient(action)) roll.bonus -= 4;
    return roll;
}

export function getMeleeAttackImpl(action) {
    const roll = new CheckDice();
    roll.name = "Melee Attack";
    roll.bonus = action.performerObject.get(RuleConstants.ATTACK_STR);
    if (!isProficient(action)) roll.bonus -= 4;
    return roll;
}

export function getThrowAttack(action) {
    const roll = new CheckDice();
    roll.name = "Throw Attack";
    roll.bonus = action.performerObject.get(RuleConstants.ATTACK_STR);
    if (isProficient(action)) roll.bonus -= 4;
    return roll;
}

export function getImprovisedAttack(action) {
    const roll = new CheckDice();
    roll.name = "Improvised Attack";
    roll.bonus = action.performerObject.get(RuleConstants.ATTACK_STR);
    if (!isProficient(action)) roll.bonus -= 4;
    return roll;
}

/**
 * @param {RuleAction} action
 * @return {CheckDice}
 */
export function getCombatManRoll(action) {
    const roll = new CheckDice();
    roll.name = "CombatM";
    roll.bonus = action.performerObject.get(RuleConstants.COMBAT_MANEUVER_BONUS);
    return roll;
}

export function acCheck(action) {
    return action.isSuccessfull = action.roll.result >= action.targetObject.get(RuleConstants.DEFENCE_AC);
}

export function touchCheck(action) {
    return action.isSuccessfull = action.roll.result >= action.targetObject.get(RuleConstants.DEFENCE_TOUCH_AC);
}

export function flatFootedCheck(action) {
    return action.isSuccessfull = action.roll.result >= action.targetObject.get(RuleConstants.DEFENCE_FLAT_FOOTED_AC);
}

export function flatFootedTouchCheck(action) {
    return action.isSuccessfull = action.roll.result >= action.targetObject.get(RuleConstants.DEFENCE_TFF_AC);
}

export function combatManeuverCheck(action) {
    return action.isSuccessfull = action.roll.result >= action.targetObject.get(RuleConstants.COMBAT_MANEUVER_DEFENCE);
}