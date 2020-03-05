/**
 * Created by LastBerserk on 05.03.2020.
 */

import RuleConstants from "../RuleConstants";
import RuleFeatsConstants from "../constants/RuleFeatsConstants";
import {axeToGrindImpl} from "./RuleFeatsImpl";

/** @param {RuleAction} action */
export function calculateAttack(action) {
    const performer = action.performerObject;
    const weapon = action.additional1;
    let bonus = performer.get(RuleConstants.BAB);
    if (weapon) {
        // TODO implement weapons
    } else {
        bonus += performer.get(RuleConstants.MOD_STRENGTH);
    }
    if (action.targetObject) {
        if (performer.ruleCharacter.feats.include(RuleFeatsConstants.AXE_TO_GRIND)) bonus += axeToGrindImpl(action)
    }
    return bonus;
}