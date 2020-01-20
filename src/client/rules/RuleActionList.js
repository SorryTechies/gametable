/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleActions from "./RuleAction";
import RuleActionsConstants from "./constants/RuleActionsConstants";
import RuleTypes from "./constants/RuleTypes";

export default class RuleActionList {
    constructor() {
        this.list = [];
    }

    addAction(action) {
        if (!action instanceof RuleActions) throw new Error("Action isn't instance of RuleActions");
        this.list.push(action);
    }

    removeAction(action) {
        const index = this.list.findIndex(item => action === item);
        if (index !== -1) this.list.splice(index, 1);
    }

    canDoFullRoundAction() {
        return !this.list.find(item =>
            item.type === RuleTypes.TYPE_FULL_ROUND ||
            item.type === RuleTypes.TYPE_MOVE ||
            item.type === RuleTypes.TYPE_STANDARD
        );
    }

    canDoMoveAction() {
        return !this.list.find(item =>
            item.type === RuleTypes.TYPE_FULL_ROUND ||
            item.type === RuleTypes.TYPE_MOVE
        );
    }

    canDoStandardAction() {
        return !this.list.find(item =>
            item.type === RuleTypes.TYPE_FULL_ROUND ||
            item.type === RuleTypes.TYPE_STANDARD
        );
    }

    canMove() {
        return !this.list.find(item =>
            item.key === RuleActionsConstants.FIVE_FOOT_STEP ||
            item.key === RuleActionsConstants.CHARGE ||
            item.key === RuleActionsConstants.SPRINT ||
            item.key === RuleActionsConstants.MOVE
        );
    }

    canDoSwiftAction() {
        return !this.list.find(item => item.type === RuleTypes.TYPE_SWIFT);
    }

    execute() {
        this.list.forEach(action => action.func());
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