/**
 * Created by LastBerserk on 10.02.2020.
 */

import RuleActionsConstants from "./constants/RuleActionsConstants";
import * as Impl from "./impl/RuleActionsImplementation";
import * as Val from "./impl/RuleActionValidationImpl";
import RuleSpellNames from "./constants/RuleSpellNames";
import RuleState from "./RuleState";

export const implementation = {
    [RuleActionsConstants.MOVE]: Impl.doMove,
    [RuleActionsConstants.FIVE_FOOT_STEP]: Impl.doMove,
    [RuleActionsConstants.ATTACK]: Impl.doAttack,
    [RuleActionsConstants.TOTAL_DEFENCE]: RuleState.doTotalDefenceState,
    [RuleActionsConstants.CAST_SPELL]: {
        [RuleSpellNames.SHOCKING_GRASP]: Impl.doShockGrasp
    }
};

export const validation = {
    [RuleActionsConstants.MOVE]: Val.moveValidation,
    [RuleActionsConstants.FIVE_FOOT_STEP]: Val.fiveFootValidation,
    [RuleActionsConstants.ATTACK]: Val.noValidation,
    [RuleActionsConstants.TOTAL_DEFENCE]: Val.noValidation,
    [RuleActionsConstants.CAST_SPELL]: {
        [RuleSpellNames.SHOCKING_GRASP]: Val.touchCheck
    }
};