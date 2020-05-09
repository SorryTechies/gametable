/**
 * Created by LastBerserk on 08.03.2020.
 */

import ACTIONS from "./RuleActionsConstants";
import RuleBuffConstants from "./RuleBuffConstants";

export const ATTACK_ACTIONS = [
    ACTIONS.MELEE_ATTACK,
    ACTIONS.IMPROVISED_ATTACK,
    ACTIONS.RANGED_ATTACK,
    ACTIONS.THROW_ATTACK,
    ACTIONS.CHARGE
];

export const FORCE_ATTACK_BUFFS = [
    RuleBuffConstants.FIGHTING_DEFENSIVELY,
    RuleBuffConstants.COMBAT_EXPERTISE
];

export const FORCE_ATTACK_ACTIONS = [
    ACTIONS.CHARGE
];

export const REPOSITION_ACTIONS = [
    ACTIONS.MOVE,
    ACTIONS.CHARGE,
    ACTIONS.SPRINT,
    ACTIONS.FIVE_FOOT_STEP
];

export const MOVE_BLOCK_ACTIONS = [
    ACTIONS.CHARGE,
    ACTIONS.SPRINT,
    ACTIONS.FIVE_FOOT_STEP
];

export const MOVE_IN_PLACE_OF_STANDARD = [
    ACTIONS.MOVE
];

export const GRAPPLING_MOVES = [
    ACTIONS.LET_GO,
    ACTIONS.DAMAGE,
    ACTIONS.PIN
];

export const GRAPPLED_MOVES = [
    ACTIONS.REVERSE,
    ACTIONS.BREAK
];