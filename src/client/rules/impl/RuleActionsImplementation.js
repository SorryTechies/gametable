/**
 * Created by LastBerserk on 21.01.2020.
 */

import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleState from "../RuleState";
import * as RuleLoader from "../RuleLoader";
import RuleWeaponToImpl from "../table/RuleWeaponToImpl";
import RuleBuffConstants from "../constants/RuleBuffConstants";

export const doMove = action => {
    action.performerObject.position = action.target;
    RuleCharacterChangesBean.addModification(action.performerId, "position", action.target);
};

export const doTotalDefence = action => {
    RuleLoader.sendTranslatedDescription(action, RuleBuffConstants.TOTAL_DEFENSE, action.performerObject.name);
    RuleState.doTotalDefenceState(action);
};
export const doAttack = action => {
    const impl = RuleWeaponToImpl[action.additional1];
    if (typeof impl === "function") impl(action);
};

export const doCharge = action => {
    action.performerObject.position = action.target;
    RuleState.doChargeState(action);
    RuleCharacterChangesBean.addModification(action.performerId, "position", action.target);
};