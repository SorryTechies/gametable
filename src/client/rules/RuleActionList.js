/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleActions from "./RuleAction";
import RuleActionsConstants from "./constants/RuleActionsConstants";
import RuleTypes from "./constants/RuleTypes";
import * as CONST from "./constants/RuleActionListConstants";
import {filterActionByKey} from "./table/RuleActionFilter";
import * as SUPP from "./constants/RuleActionListSupportConstants";

function isForcingAttackState(action) {
   if (SUPP.FORCE_ATTACK_BUFFS.includes(action.additional1)) return true;
   if (SUPP.FORCE_ATTACK_ACTIONS.includes(action.key)) return true;
   return false;
}

/**
 *
 * @param {RuleActionList} list
 * @param {RuleAction} action
 */
function setTriggers(list, action) {
    switch (action.type) {
        case RuleTypes.TYPE_STANDARD:
            action.consumeStandartSlot = true;
            list.canDoStandardAction = false;
            break;
        case RuleTypes.TYPE_MOVE:
            action.consumeMoveSlot = list.canDoMoveAction;
            action.consumeStandartSlot = !list.canDoMoveAction;
            list.canDoMoveAction = false;
            break;
        case RuleTypes.TYPE_FULL_ROUND:
            action.consumeMoveSlot = true;
            action.consumeStandartSlot = true;
            list.canDoMoveAction = false;
            list.canDoStandardAction = false;
            break;
        case RuleTypes.TYPE_SWIFT:
            list.canDoSwiftAction = false;
            break;
        case RuleTypes.TYPE_IMMEDIATE:
            break;
    }
    if (isForcingAttackState(action)) list.mustAttackOnThisRound = true;
    if (SUPP.REPOSITION_ACTIONS.includes(action.key)) list.movedAlready = true;
    if (SUPP.MOVE_BLOCK_ACTIONS.includes(action.key)) list.canMove = false;
}

/**
 *
 * @param {RuleActionList} list
 * @param {RuleAction} deletedAction
 */
function removeTriggers(list, deletedAction) {
    if (deletedAction.consumeMoveSlot) list.canDoMoveAction = true;
    if (deletedAction.consumeStandartSlot) list.canDoStandardAction = true;
    switch (deletedAction.type) {
        case RuleTypes.TYPE_SWIFT:
            list.canDoSwiftAction = true;
            break;
    }
    if (!list.list.find(isForcingAttackState)) list.mustAttackOnThisRound = false;
    if (!list.list.find(action => SUPP.MOVE_BLOCK_ACTIONS.includes(action.key))) list.canMove = true;
    if (!list.list.find(action => SUPP.REPOSITION_ACTIONS.includes(action.key))) list.movedAlready = false;
}

export default class RuleActionList {
    constructor(object) {
        /** @type {Array<RuleAction>} */
        this.list = [];
        this.gameObject = object;
        this.canDoMoveAction = true;
        this.movedAlready = false;
        this.canMove = true;
        this.canDoStandardAction = true;
        this.canDoSwiftAction = true;
        this.mustAttackOnThisRound = false;
    }

    addAction(action) {
        if (!action instanceof RuleActions) throw new Error("Action isn't instance of RuleAction");
        this.list.push(action);
        setTriggers(this, action);
    }

    isDoingAction() {
        return this.list.find(item => item.key);
    }

    removeAction(action) {
        const index = this.list.findIndex(item => action.id === item.id);
        if (index !== -1) {
            this.list.splice(index, 1);
            removeTriggers(this, action);
        }
    }

    getAllowedActionsList() {
        let ans = [...CONST.FREE_ACTIONS, ...CONST.IMMEDIATE_ACTION];
        if (this.canDoStandardAction && this.canDoMoveAction) ans = ans.concat(CONST.FULL_ROUND_ACTIONS);
        if (this.canDoStandardAction) ans = ans.concat(CONST.STANDARD_ACTIONS);
        if (this.canDoMoveAction || this.canDoStandardAction) ans = ans.concat(CONST.MOVE_ACTIONS);
        if (this.canDoSwiftAction) ans = ans.concat(CONST.SWIFT_ACTION);
        ans = ans.filter(filterActionByKey.bind(null, this));
        return ans;
    }

    executeActions() {
        this.list.forEach(action => action.doAction());
    }

    reset() {
        this.list.forEach(action => action.reset());
    }
}