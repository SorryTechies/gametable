/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleActionsConstants from "./constants/RuleActionsConstants";
import RuleTypes from "./constants/RuleTypes";

function findType(key) {
    const type = Object.keys(RuleActions.ACTION_TYPE_OBJECT).find(key => RuleActions.ACTION_TYPE_OBJECT[key].includes(key));
    if (type) return type;
    throw new Error(`Type ${key} isn't found.`);
}

export default class RuleActions {
    constructor(key) {
        this.key = key;
        this.func = RuleActions.DEFAULT_ACTION;
        this.type = findType(key);
    }
}

RuleActions.DEFAULT_ACTION = () => {};

RuleActions.MOVE_ACTIONS = [
    RuleActionsConstants.MOVE
];

RuleActions.STANDARD_ACTIONS = [
    RuleActionsConstants.ATTACK,
    RuleActionsConstants.CAST_SPELL
];

RuleActions.FULL_ROUND_ACTIONS = [
    RuleActionsConstants.CHARGE,
    RuleActionsConstants.SPRINT,
    RuleActionsConstants.FULL_ROUND_ATTACK,
    RuleActionsConstants.FULL_ROUND_SPELL
];

RuleActions.FREE_ACTIONS = [
    RuleActionsConstants.FIVE_FOOT_STEP
];

RuleActions.IMMEDIATE_ACTION = [];

RuleActions.SWIFT_ACTION = [];

RuleActions.ACTION_TYPE_OBJECT = {
    [RuleTypes.TYPE_MOVE]: RuleActions.MOVE_ACTIONS,
    [RuleTypes.TYPE_STANDARD]: RuleActions.STANDARD_ACTIONS,
    [RuleTypes.TYPE_FULL_ROUND]: RuleActions.FULL_ROUND_ACTIONS,
    [RuleTypes.TYPE_FREE]: RuleActions.FREE_ACTIONS,
    [RuleTypes.TYPE_IMMEDIATE]:RuleActions.IMMIDIATE_ACTION,
    [RuleTypes.TYPE_SWIFT]: RuleActions.SWIFT_ACTION
};