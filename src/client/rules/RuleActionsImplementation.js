/**
 * Created by LastBerserk on 21.01.2020.
 */

import RuleActionsConstants from "./RuleConstants";

export const doMove = action => {
    action.unit.x = action.target.x;
    action.unit.y = action.target.y;
};

export const doAttack = action => action.target.set(RuleActionsConstants.LETHAL_DAMAGE, action.additional.value);