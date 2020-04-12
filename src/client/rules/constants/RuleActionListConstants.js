/**
 * Created by LastBerserk on 07.03.2020.
 */

import RuleActionsConstants from "./RuleActionsConstants";

export const MOVE_ACTIONS = [
    RuleActionsConstants.MOVE,
    RuleActionsConstants.CHARGE
];

export const STANDARD_ACTIONS = [
    RuleActionsConstants.MELEE_ATTACK,
    RuleActionsConstants.RANGED_ATTACK,
    RuleActionsConstants.CAST_SPELL,
    RuleActionsConstants.TOTAL_DEFENCE,
    RuleActionsConstants.COMBAT_MANEUVERS
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
    RuleActionsConstants.ACTIVATE_STATE,
    RuleActionsConstants.DEACTIVATE_STATE
];

export const SWIFT_ACTION = [];