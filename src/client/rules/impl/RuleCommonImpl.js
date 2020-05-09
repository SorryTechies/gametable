/**
 * Created by LastBerserk on 05.03.2020.
 */

import CONST from "../constants/RuleStatConstants";
import CheckDice from "../../logic/roll/CheckDice";

export function calculateMoveDistance(p1, p2) {
    return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y)) + Math.floor(Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y)) / 2);
}

/**
 * @param {RuleAction} action
 * @return {CheckDice}
 */
export function getCombatManRoll(action) {
    const roll = new CheckDice();
    roll.name = "CombatM";
    roll.bonus = action.performerObject.get(CONST.COMBAT_MANEUVER_BONUS);
    if (action.performerObject.hasFeat(CONST.IMPROVED_GRAPPLE)) roll.bonus += 2;
    return roll;
}

export function acCheck(action) {
    return action.isSuccessfull = action.roll.result >= action.targetObject.get(CONST.DEFENCE_AC);
}

export function touchCheck(action) {
    return action.isSuccessfull = action.roll.result >= action.targetObject.get(CONST.DEFENCE_TOUCH_AC);
}

export function flatFootedCheck(action) {
    return action.isSuccessfull = action.roll.result >= action.targetObject.get(CONST.DEFENCE_FLAT_FOOTED_AC);
}

export function flatFootedTouchCheck(action) {
    return action.isSuccessfull = action.roll.result >= action.targetObject.get(CONST.DEFENCE_TFF_AC);
}

export function combatManeuverCheck(action) {
    return action.isSuccessfull = action.roll.result >= action.targetObject.get(CONST.COMBAT_MANEUVER_DEFENCE);
}