/**
 * Created by LastBerserk on 05.03.2020.
 */

import RuleConstants from "../constants/RuleStatConstants";
import RuleFeatsConstants from "../constants/RuleFeatsConstants";
import {axeToGrindImpl} from "./RuleFeatsImpl";
import CheckDice from "../../logic/roll/CheckDice";
import RuleWeaponConstants from "../constants/RuleWeaponConstants";

export function calculateAttack(action, isRanged) {
    const attacker = action.performerObject;
    let bonus = 0;
    if (isRanged) {
        bonus += attacker.get(RuleConstants.ATTACK_DEX);
    } else {
        bonus += attacker.get(RuleConstants.ATTACK_STR);
        if (action.targetObject) {
            if (action.additional1 === RuleWeaponConstants.UNARMED_STRIKE) {
                if (!attacker.ruleCharacter.hasFeat(RuleFeatsConstants.IMPROVED_UNARMED_STRIKE)) bonus -= 4;
            }
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