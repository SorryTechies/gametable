/**
 * Created by LastBerserk on 10.02.2020.
 */

import RuleActionsConstants from "./constants/RuleActionsConstants";
import * as Impl from "./impl/RuleActionsImplementation";
import * as Val from "./impl/RuleActionValidationImpl";
import RuleSpellNames from "./constants/RuleSpellNames";

export const implementation = {
    [RuleActionsConstants.MOVE]: Impl.doMove,
    [RuleActionsConstants.ATTACK]: Impl.doAttack,
    [RuleActionsConstants.CAST_SPELL]: {
        [RuleSpellNames.SHOCKING_GRASP]: Impl.doShockGrasp
    }
};

export const validation = {
    [RuleActionsConstants.MOVE]: Val.moveValidation,
    [RuleActionsConstants.ATTACK]: Val.attackValidation,
    [RuleActionsConstants.CAST_SPELL]: {
        [RuleSpellNames.SHOCKING_GRASP]: Val.touchCheck
    }
};