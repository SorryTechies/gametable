/**
 * Created by LastBerserk on 21.01.2020.
 */

import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleState from "../RuleState";
import * as RuleLoader from "../RuleLoader";
import RuleBuffConstants from "../constants/RuleBuffConstants";

export const doMove = action => {
    action.performerObject.position = action.target;
    RuleCharacterChangesBean.addModification(action.performerId, "position", action.target);
};

export const doEquip = action => action.performerObject.items.slots.equipDM(action.targetItem, action.additional1);

export function doUnequip(action) {
    action.performerObject.items.slots.unequipDM(action.targetItem, action.additional1);
}

export const doTotalDefence = action => {
    RuleState.doTotalDefenceState(action);
    action.sendDescriptionText();
};

export const doCharge = action => {
    action.performerObject.position = action.target;
    RuleState.doChargeState(action);
    RuleCharacterChangesBean.addModification(action.performerId, "position", action.target);
};