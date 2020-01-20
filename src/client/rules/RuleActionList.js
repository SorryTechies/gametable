/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleActions from "./RuleAction";
import RuleActionsConstants from "./constants/RuleActionsConstants";

function remFromArray(arr, action) {
    const index = arr.findIndex(item => action === item);
    if (index !== -1) arr.splice(index, 1);
}

export default class RuleActionList {
    constructor() {
        this.move = null;
        this.five_foot = null;
        this.standard = null;
        this.full_round = null;
        this.swift = null;
        this.immidiate = [];
        this.free = [];
    }

    addAction(action) {
        if (!action instanceof RuleActions) throw new Error("Action isn't instance of RuleActions");
        if (RuleActionList.FREE_ACTIONS.includes(action.key)) return this.free.push(action);
        if (RuleActionList.IMMIDIATE_ACTION.includes(action.key)) return this.immidiate.push(action);
        if (RuleActionList.MOVE_ACTIONS.includes(action.key)) return this.move = action;
        if (RuleActionList.STANDARD_ACTIONS.includes(action.key)) return this.standard = action;
        if (RuleActionList.FULL_ROUND_ACTIONS.includes(action.key)) return this.full_round = action;
        if (RuleActionList.SWIFT_ACTION.includes(action.key)) return this.swift = action;
        if (RuleActionsConstants.FIVE_FOOT_STEP === action.key) return this.five_foot = action;
    }

    removeAction(action) {
        if (RuleActionList.FREE_ACTIONS.includes(action.key)) return remFromArray(this.free, action);
        if (RuleActionList.IMMIDIATE_ACTION.includes(action.key)) return remFromArray(this.immidiate, action);
        if (RuleActionList.MOVE_ACTIONS.includes(action.key)) return this.move = null;
        if (RuleActionList.STANDARD_ACTIONS.includes(action.key)) return this.standard = null;
        if (RuleActionList.FULL_ROUND_ACTIONS.includes(action.key)) return this.full_round = null;
        if (RuleActionList.SWIFT_ACTION.includes(action.key)) return this.swift = null;
        if (RuleActionsConstants.FIVE_FOOT_STEP === action.key) return this.five_foot = null;
    }

    canDoFullRoundAction() {
        return !(this.standard || this.move || this.full_round);
    }

    canDoMoveAction() {
        return !(this.full_round || this.move);
    }

    canDoStandardAction() {
        return !(this.full_round || this.standard);
    }

    canMove() {
        return !(this.move === RuleActionsConstants.MOVE ||
        this.full_round === RuleActionsConstants.SPRINT ||
        this.full_round === RuleActionsConstants.CHARGE ||
        this.five_foot === RuleActionsConstants.FIVE_FOOT_STEP);
    }
}

RuleActionList.MOVE_ACTIONS = [
    RuleActionsConstants.MOVE
];

RuleActionList.STANDARD_ACTIONS = [
    RuleActionsConstants.ATTACK,
    RuleActionsConstants.CAST_SPELL
];

RuleActionList.FULL_ROUND_ACTIONS = [
    RuleActionsConstants.CHARGE,
    RuleActionsConstants.SPRINT,
    RuleActionsConstants.FULL_ROUND_ATTACK,
    RuleActionsConstants.FULL_ROUND_SPELL
];

RuleActionList.FREE_ACTIONS = [
    RuleActionsConstants.FIVE_FOOT_STEP
];

RuleActionList.IMMIDIATE_ACTION = [];

RuleActionList.SWIFT_ACTION = [];