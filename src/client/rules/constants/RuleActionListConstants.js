/**
 * Created by LastBerserk on 07.03.2020.
 */

import RuleActionsConstants from "./RuleActionsConstants";

export const MOVE_ACTIONS = [
    RuleActionsConstants.GRAB,
    RuleActionsConstants.MOVE,
    RuleActionsConstants.CHARGE
];

export const STANDARD_ACTIONS = [
    RuleActionsConstants.CAST_SPELL,
    RuleActionsConstants.TOTAL_DEFENCE,
    RuleActionsConstants.COMBAT_MANEUVERS
];

export const ATTACK_ACTIONS = [
    RuleActionsConstants.IMPROVISED_ATTACK,
    RuleActionsConstants.MELEE_ATTACK,
    RuleActionsConstants.RANGED_ATTACK,
];

export const FULL_ROUND_ACTIONS = [
    RuleActionsConstants.SPRINT,
    RuleActionsConstants.EQUIP,
    RuleActionsConstants.UNEQUIP
];

export const FREE_ACTIONS = [
    RuleActionsConstants.FIVE_FOOT_STEP
];

export const IMMEDIATE_ACTION = [
    RuleActionsConstants.DROP,
    RuleActionsConstants.ACTIVATE_STATE,
    RuleActionsConstants.DEACTIVATE_STATE
];

export const SWIFT_ACTION = [];