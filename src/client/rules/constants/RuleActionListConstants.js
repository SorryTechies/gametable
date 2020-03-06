/**
 * Created by LastBerserk on 07.03.2020.
 */

import RuleActionsConstants from "./RuleActionsConstants";

export const REPOSITION_ACTIONS = [
    RuleActionsConstants.MOVE,
    RuleActionsConstants.CHARGE,
    RuleActionsConstants.SPRINT,
    RuleActionsConstants.FIVE_FOOT_STEP
];

export const MOVE_ACTIONS = [
    RuleActionsConstants.MOVE
];

export const STANDARD_ACTIONS = [
    RuleActionsConstants.ATTACK,
    RuleActionsConstants.CAST_SPELL
];

export const FULL_ROUND_ACTIONS = [
    RuleActionsConstants.CHARGE,
    RuleActionsConstants.SPRINT,
    RuleActionsConstants.FULL_ROUND_ATTACK,
    RuleActionsConstants.FULL_ROUND_SPELL,
    RuleActionsConstants.TOTAL_DEFENCE
];

export const FREE_ACTIONS = [
    RuleActionsConstants.FIVE_FOOT_STEP
];

export const IMMEDIATE_ACTION = [
    RuleActionsConstants.ACTIVATE_STATE,
    RuleActionsConstants.DEACTIVATE_STATE
];

export const SWIFT_ACTION = [];