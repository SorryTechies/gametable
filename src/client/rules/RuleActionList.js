/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleActions from "./RuleAction";
import RuleActionsConstants from "./constants/RuleActionsConstants";
import RuleTypes from "./constants/RuleTypes";
import * as CONST from "./constants/RuleActionListConstants";

export default class RuleActionList {
    constructor(object) {
        this.list = [];
        this.gameObject = object;
    }

    addAction(action) {
        if (!action instanceof RuleActions) throw new Error("Action isn't instance of RuleAction");
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
        return !this.list.some(item => CONST.REPOSITION_ACTIONS.includes(item.key));
    }

    canDoSwiftAction() {
        return !this.list.find(item => item.type === RuleTypes.TYPE_SWIFT);
    }

    getAllowedActionsList() {
        let ans = CONST.FREE_ACTIONS && CONST.IMMEDIATE_ACTION;
        if (this.canDoFullRoundAction()) ans = ans.concat(CONST.FULL_ROUND_ACTIONS);
        if (this.canDoStandardAction()) ans = ans.concat(CONST.STANDARD_ACTIONS);
        if (this.canDoMoveAction()) ans = ans.concat(CONST.MOVE_ACTIONS);
        if (this.canDoSwiftAction()) ans = ans.concat(CONST.SWIFT_ACTION);
        if (!this.canMove()) ans = ans.filter(key => !CONST.MOVE_ACTIONS.includes(key));
        return ans;
    }

    executeActions() {
        this.list.forEach(action => action.doAction());
    }

    reset() {
        this.list.forEach(action => action.reset());
    }
}