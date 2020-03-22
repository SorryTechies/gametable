/**
 * Created by LastBerserk on 22.03.2020.
 */

import {getCombatManRoll} from "./RuleCommonImpl";
import RuleConstants from "../constants/RuleStatConstants";
import RuleBuff from "../RuleBuff";
import RuleBuffConstants from "../constants/RuleBuffConstants";
import RuleWearSlots from "../items/const/RuleWearSlots";

function isRerolled(roll, target) {
    roll.roll();
    return roll.result >= target.get(RuleConstants.COMBAT_MANEUVER_DEFENCE);
}

export function doGrapple(action) {
    const roll = getCombatManRoll(action);
    if (isRerolled(roll, action.target)) {
        const grappled = new RuleBuff(RuleBuffConstants.GRAPPLED);
        grappled.setTarget(action.target);
        action.target.buffs.addDM(grappled);
        const grappling = new RuleBuff(RuleBuffConstants.GRAPPLING);
        grappling.setTarget(action.performerObject);
        action.performerObject.buffs.addDM(grappling);
    }
}

export function doDisarm(action) {
    const roll = getCombatManRoll(action);
    /** @type {RuleGameObject} */
    const target = action.target;
    if (isRerolled(roll, target)) {
        let item = target.items.slots.getSlot(RuleWearSlots.RIGHT_HAND);
        if (!item) item = target.items.slots.getSlot(RuleWearSlots.LEFT_HAND);
        if (!item) throw new Error("Trying to disarm but there are no items in hands!");
        target.items.dropItem(item);
    }
}