/**
 * Created by LastBerserk on 05.03.2020.
 */

import RuleConstants from "../RuleConstants";
import RuleFeatsConstants from "../constants/RuleFeatsConstants";
import {axeToGrindImpl} from "./RuleFeatsImpl";
import CheckDice from "../../logic/roll/CheckDice";

export function calculateAttack(action, isRanged) {
    const attacker = action.performerObject;
    let bonus = attacker.get(RuleConstants.BAB) + attacker.get(RuleConstants.ATTACK_FLAT);
    if (isRanged) {
        bonus += attacker.get(RuleConstants.ATTACK_DEX);
    } else {
        bonus += attacker.get(RuleConstants.ATTACK_STR);
        if (action.targetObject) {
            if (attacker.ruleCharacter.feats.include(RuleFeatsConstants.AXE_TO_GRIND)) bonus += axeToGrindImpl(action)
        }
    }

    return bonus;
}

export function getAttackRoll(action, isRanged) {
    const roll = new CheckDice();
    roll.bonus = calculateAttack(action, isRanged);
    return roll;
}