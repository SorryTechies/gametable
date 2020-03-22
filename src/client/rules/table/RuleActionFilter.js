/**
 * Created by LastBerserk on 08.03.2020.
 */

import * as RuleActionListSupportConstants from "../constants/RuleActionListSupportConstants";
import RuleActionsConstants from "../constants/RuleActionsConstants";
import RuleConstants from "../constants/RuleStatConstants";

function filterAttacksOnly(list, key) {
    return list.mustAttackOnThisRound && (
            RuleActionListSupportConstants.MOVE_IN_PLACE_OF_STANDARD.includes(key) ||
            !RuleActionListSupportConstants.ATTACK_ACTIONS.includes(key)
        );
}

function filterReposition(list, key) {
    return !list.canMove && RuleActionListSupportConstants.REPOSITION_ACTIONS.includes(key);
}

function filterMustHaveAttack(list, key) {
    return !list.canDoStandardAction && (
        RuleActionListSupportConstants.FORCE_ATTACK_BUFFS.includes(key) ||
            RuleActionListSupportConstants.FORCE_ATTACK_ACTIONS.includes(key));
}

function filterAlreadyMoved(list, key) {
    return list.movedAlready && RuleActionListSupportConstants.MOVE_BLOCK_ACTIONS.includes(key);
}

/**
 * @param {RuleActionList} list
 * @param {string} key
 * @return {boolean}
 */
export function filterActionByKey(list, key) {
    switch (key) {
        case (RuleActionsConstants.CAST_SPELL):
            const spells = list.gameObject.ruleCharacter.get(RuleConstants.SPELL_ARRAY);
            if (!spells || spells.length === 0) return false;
            break;
        case (RuleActionsConstants.DEACTIVATE_STATE):
            if (!list.gameObject.buffs.hasDispellable) return false;
            break;
    }
    if (!list) throw new Error("No list provided.");
    if (!key) throw new Error("No key provided.");
    if (filterAttacksOnly(list, key)) return false;
    if (filterReposition(list, key)) return false;
    if (filterMustHaveAttack(list, key)) return false;
    if (filterAlreadyMoved(list, key)) return false;
    return true;
}