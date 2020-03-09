/**
 * Created by LastBerserk on 08.03.2020.
 */

import RuleActionsConstants from "./RuleActionsConstants";
import RuleBuffConstants from "./RuleBuffConstants";

export const ATTACK_ACTIONS = [
    RuleActionsConstants.MELEE_ATTACK,
    RuleActionsConstants.CHARGE
];

export const FORCE_ATTACK_BUFFS = [
    RuleBuffConstants.FIGHTING_DEFENSIVELY,
    RuleBuffConstants.COMBAT_EXPERTISE
];

export const FORCE_ATTACK_ACTIONS = [
    RuleActionsConstants.CHARGE
];

export const REPOSITION_ACTIONS = [
    RuleActionsConstants.MOVE,
    RuleActionsConstants.CHARGE,
    RuleActionsConstants.SPRINT,
    RuleActionsConstants.FIVE_FOOT_STEP
];

export const MOVE_BLOCK_ACTIONS = [
    RuleActionsConstants.CHARGE,
    RuleActionsConstants.SPRINT,
    RuleActionsConstants.FIVE_FOOT_STEP
];

export const MOVE_IN_PLACE_OF_STANDARD = [
    RuleActionsConstants.MOVE
];

export const GRAPPLE_MOVES = [
];