/**
 * Created by LastBerserk on 20.01.2020.
 */

import RuleActions from "../RuleAction";
import RuleTypes from "../constants/RuleTypes";
import * as CONST from "../constants/RuleActionListConstants";
import {filterActionByKey} from "../table/RuleActionFilter";
import * as SUPP from "../constants/RuleActionListSupportConstants";
import STATS from "../constants/RuleStatConstants";
import SLOTS from "../items/const/RuleWearSlots";
import FEATS from "../constants/RuleFeatsConstants";
import BUFFS from "../constants/RuleBuffConstants";

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
            break;
        case RuleTypes.TYPE_MOVE:
            action.consumeMoveSlot = list.canDoMoveAction;
            action.consumeStandartSlot = !list.canDoMoveAction;
            break;
        case RuleTypes.TYPE_FULL_ROUND:
            action.consumeMoveSlot = true;
            action.consumeStandartSlot = true;
            break;
        case RuleTypes.TYPE_SWIFT:
            list.canDoSwiftAction = false;
            break;
        case RuleTypes.TYPE_IMMEDIATE:
            break;
        case RuleTypes.TYPE_ATTACK:
            if (list.canDoStandardAction) {
                action.consumeStandartSlot = true;
            } else {
                action.consumeMoveSlot = true;
            }
            ++list.attacks;
            if (action.additional1.twoHanded) list.twoWeaponAttack = false;
            break;

    }
    if (isForcingAttackState(action)) list.mustAttackOnThisRound = true;
    if (SUPP.REPOSITION_ACTIONS.includes(action.key)) list.movedAlready = true;
    if (SUPP.MOVE_BLOCK_ACTIONS.includes(action.key)) list.canMove = false;
    if (action.consumeMoveSlot) list.canDoMoveAction = false;
    if (action.consumeStandartSlot) list.canDoStandardAction = false;
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
        case RuleTypes.TYPE_ATTACK:
            --list.attacks;
            if (!list.list.find(action => action.additional1 && action.additional1.twoWeaponAttack)) list.twoWeaponAttack = true;
            break;
    }
    if (!list.list.find(isForcingAttackState)) list.mustAttackOnThisRound = false;
    if (!list.list.find(action => SUPP.MOVE_BLOCK_ACTIONS.includes(action.key))) list.canMove = true;
    if (!list.list.find(action => SUPP.REPOSITION_ACTIONS.includes(action.key))) list.movedAlready = false;
}

function canAttack(obj) {
    if (!obj.canDoMoveAction && obj.attacks === 1) {
        return false;
    } else {
        return obj.gameObject.get(STATS.AMOUNT_OF_ATTACKS) + (obj.twoWeaponAttack ? 1 : 0) > obj.attacks;
    }
}

export default class RuleActionList {
    constructor(object) {
        /** @type {Array<RuleAction>} */
        this.list = [];
        /** @type {RuleGameObject} */
        this.gameObject = object;
        this.canDoMoveAction = true;
        this.movedAlready = false;
        this.canMove = true;
        this.canDoStandardAction = true;
        this.canDoSwiftAction = true;
        this.mustAttackOnThisRound = false;
        this.attacks = 0;
        this.twoWeaponAttack = true;
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
        const obj = this.list[index];
        if (index !== -1) {
            this.list.splice(index, 1);
            removeTriggers(this, obj);
            return obj;
        }
    }

    getAllowedActionsList() {
        let ans = new Set([...CONST.FREE_ACTIONS, ...CONST.IMMEDIATE_ACTION]);
        if (this.canDoStandardAction && this.canDoMoveAction) CONST.FULL_ROUND_ACTIONS.forEach(ans.add, ans);
        if (this.canDoStandardAction) CONST.STANDARD_ACTIONS.forEach(ans.add, ans);
        if (canAttack(this)) CONST.ATTACK_ACTIONS.forEach(ans.add, ans);
        if (this.canDoMoveAction || this.canDoStandardAction) CONST.MOVE_ACTIONS.forEach(ans.add, ans);
        if (this.canDoSwiftAction) CONST.SWIFT_ACTION.forEach(ans.add, ans);
        if (this.gameObject.hasBuff(BUFFS.GRAPPLING)) SUPP.GRAPPLING_MOVES.forEach(ans.add, ans);
        if (this.gameObject.hasBuff(BUFFS.GRAPPLED)) SUPP.GRAPPLED_MOVES.forEach(ans.add, ans);
        return Array.from(ans).filter(filterActionByKey.bind(null, this));
    }

    /**
     * @param {RuleItem} item
     * @return boolean
     */
    canAttackWithWeapon(item) {
        return this.list.filter(action => action.additional1 === item).length < this.gameObject.get(STATS.AMOUNT_OF_ATTACKS);
    }

    executeActions() {
        let attacksCount = 0;
        let left = false;
        let right = false;
        let isLightWeapon = false;
        this.list.forEach(action => {
            const character = action.performerObject.ruleCharacter;
            if (CONST.ATTACK_ACTIONS.includes(action.key)) {
                let isConsecutive = false;
                if (action.additional1) {
                    if (action.additional1.slot === SLOTS.RIGHT_HAND) {
                        if (right) {
                            isConsecutive = true;
                        } else {
                            right = true;
                        }
                    } else {
                        if (left) {
                            isConsecutive = true;
                        } else {
                            left = true;
                            isLightWeapon = Array.isArray(action.additional1.additionalTags) && action.additional1.additionalTags.includes("light");
                        }
                    }
                }
                if (isConsecutive) {
                    ++attacksCount;
                    action.consecutiveActionPenalty += attacksCount * 5;
                }
            }
        });
        this.list.forEach(action => {
            if (left && right) {
                const character = action.performerObject.ruleCharacter;
                if (character.hasFeat(FEATS.TWO_WEAPON_FIGHTING)) {
                    action.consecutiveActionPenalty += isLightWeapon ? 2 : 4;
                } else {
                    const leftHand = action.additional1.slot === SLOTS.LEFT_HAND;
                    if (isLightWeapon) {
                        if (leftHand) {
                            action.consecutiveActionPenalty += 8;
                        } else {
                            action.consecutiveActionPenalty += 4;
                        }
                    } else {
                        if (leftHand) {
                            action.consecutiveActionPenalty += 10;
                        } else {
                            action.consecutiveActionPenalty += 6;
                        }
                    }
                }
            }
            action.doAction();
        });
    }

    reset() {
        this.list.forEach(action => action.reset());
    }
}