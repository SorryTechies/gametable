/**
 * Created by LastBerserk on 10.02.2020.
 */

import RuleActionsConstants from "../constants/RuleActionsConstants";
import * as Impl from "../impl/RuleActionsImplementation";
import * as Val from "../impl/RuleActionValidationImpl";
import RuleSpellNames from "../constants/RuleSpellNames";
import RuleState from "../RuleState";
import RuleBuffConstants from "../constants/RuleBuffConstants";

export const implementation = {
    [RuleActionsConstants.MOVE]: Impl.doMove,
    [RuleActionsConstants.CHARGE]: Impl.doCharge,
    [RuleActionsConstants.FIVE_FOOT_STEP]: Impl.doMove,
    [RuleActionsConstants.MELEE_ATTACK]: Impl.doAttack,
    [RuleActionsConstants.RANGED_ATTACK]: Impl.doAttack,
    [RuleActionsConstants.TOTAL_DEFENCE]: RuleState.doTotalDefenceState,
    [RuleActionsConstants.CAST_SPELL]: {
        [RuleSpellNames.SHOCKING_GRASP]: Impl.doShockGrasp
    },
    [RuleActionsConstants.ACTIVATE_STATE]: {
        [RuleBuffConstants.COMBAT_EXPERTISE]: RuleState.activateCombatExpertise,
        [RuleBuffConstants.FIGHTING_DEFENSIVELY]: RuleState.activateFightingDefensively,
    },
    [RuleActionsConstants.DEACTIVATE_STATE]: {
        [RuleBuffConstants.COMBAT_EXPERTISE]: RuleState.removeStateAction,
        [RuleBuffConstants.FIGHTING_DEFENSIVELY]: RuleState.removeStateAction,
    }
};

export const validation = {
    [RuleActionsConstants.MOVE]: Val.moveValidation,
    [RuleActionsConstants.CHARGE]: Val.moveValidation,
    [RuleActionsConstants.FIVE_FOOT_STEP]: Val.fiveFootValidation,
    [RuleActionsConstants.MELEE_ATTACK]: Val.noValidation,
    [RuleActionsConstants.RANGED_ATTACK]: Val.noValidation,
    [RuleActionsConstants.TOTAL_DEFENCE]: Val.noValidation,
    [RuleActionsConstants.CAST_SPELL]: {
        [RuleSpellNames.SHOCKING_GRASP]: Val.touchCheck
    },
    [RuleActionsConstants.ACTIVATE_STATE]: {
        [RuleBuffConstants.COMBAT_EXPERTISE]: Val.noValidation,
        [RuleBuffConstants.FIGHTING_DEFENSIVELY]: Val.noValidation,
    },
    [RuleActionsConstants.DEACTIVATE_STATE]: {
        [RuleBuffConstants.COMBAT_EXPERTISE]: Val.noValidation,
        [RuleBuffConstants.FIGHTING_DEFENSIVELY]: Val.noValidation,
    }
};