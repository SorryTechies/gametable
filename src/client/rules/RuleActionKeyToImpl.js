/**
 * Created by LastBerserk on 10.02.2020.
 */

import RuleActionsConstants from "./constants/RuleActionsConstants";
import * as Impl from "./RuleActionsImplementation";
import * as Val from "./RuleActionValidationImpl";

export const implementation = {
    [RuleActionsConstants.MOVE]: Impl.doMove,
    [RuleActionsConstants.ATTACK]: Impl.doAttack
};

export const validation = {
    [RuleActionsConstants.MOVE]: Val.moveValidation,
    [RuleActionsConstants.ATTACK]: Val.attackValidation
};