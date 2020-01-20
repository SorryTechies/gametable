/**
 * Created by LastBerserk on 21.01.2020.
 */

import RuleActionsConstants from "./RuleConstants";

export const doMove = action => {
    action.unit.x = action.additional.x;
    action.unit.y = action.additional.y;
};

export const doAttack = action => action.target.set(RuleActionsConstants.LETHAL_DAMAGE, action.additional.value);