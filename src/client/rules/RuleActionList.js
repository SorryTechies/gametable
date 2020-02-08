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
        const index = this.list.findIndex(item => action.id === item.id);
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
        return !this.list.some(item => RuleActionList.REPOSITION_ACTIONS.includes(item.key));
    }

    canDoSwiftAction() {
        return !this.list.find(item => item.type === RuleTypes.TYPE_SWIFT);
    }

    getAllowedActionsList() {
        let ans = [];
        if (this.canDoFullRoundAction()) ans = ans.concat(RuleActionList.FULL_ROUND_ACTIONS);
        if (this.canDoStandardAction()) ans = ans.concat(RuleActionList.STANDARD_ACTIONS);
        if (this.canDoMoveAction()) ans = ans.concat(RuleActionList.MOVE_ACTIONS);
        if (this.canDoSwiftAction()) ans = ans.concat(RuleActionList.SWIFT_ACTION);
        if (!this.canMove()) ans = ans.filter(key => !RuleActionList.MOVE_ACTIONS.includes(key));
        return ans;
    }
}

RuleActionList.REPOSITION_ACTIONS = [
    RuleActionsConstants.MOVE,
    RuleActionsConstants.CHARGE,
    RuleActionsConstants.SPRINT,
    RuleActionsConstants.FIVE_FOOT_STEP
];

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