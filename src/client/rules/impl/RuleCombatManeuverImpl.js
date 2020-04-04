/**
 * Created by LastBerserk on 22.03.2020.
 */

import {combatManeuverCheck, getCombatManRoll} from "./RuleCommonImpl";
import RuleBuff from "../RuleBuff";
import RuleBuffConstants from "../constants/RuleBuffConstants";
import RuleWearSlots from "../items/const/RuleWearSlots";

export function doGrapple(action) {
    action.roll = getCombatManRoll(action).roll();
    if (combatManeuverCheck(action)) {
        const grappled = new RuleBuff(RuleBuffConstants.GRAPPLED);
        grappled.setTarget(action.targetObject);
        action.targetObject.buffs.addDM(grappled);
        const grappling = new RuleBuff(RuleBuffConstants.GRAPPLING);
        grappling.setTarget(action.performerObject);
        action.performerObject.buffs.addDM(grappling);
    }
}

export function doDisarm(action) {
    action.roll = getCombatManRoll(action).roll();
    if (combatManeuverCheck(action)) {
        let item = action.targetObject.items.slots.getSlot(RuleWearSlots.RIGHT_HAND);
        if (!item) item = action.targetObject.items.slots.getSlot(RuleWearSlots.LEFT_HAND);
        if (!item) throw new Error("Trying to disarm but there are no items in hands!");
        action.targetObject.items.dropItem(item);
    }
}