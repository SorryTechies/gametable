/**
 * Created by LastBerserk on 10.02.2020.
 */

import RAC from "../constants/RuleActionsConstants";
import * as Impl from "../impl/RuleActionsImplementation";
import * as Val from "../impl/RuleActionValidationImpl";
import RSN from "../constants/RuleSpellNames";
import RuleState from "../RuleState";
import RBC from "../constants/RuleBuffConstants";
import RCML from "../constants/RuleCombatManeuverList";
import * as SpellImpl from "../impl/RuleSpellImpl";
import * as CMBImpl from "../impl/RuleCombatManeuverImpl";
import * as Weapon from "../impl/RuleWeaponImpl";

export const implementation = {
    [RAC.MOVE]: Impl.doMove,
    [RAC.CHARGE]: Impl.doCharge,
    [RAC.FIVE_FOOT_STEP]: Impl.doMove,
    [RAC.MELEE_ATTACK]: Weapon.simpleMeleeAttackImpl,
    [RAC.RANGED_ATTACK]: Weapon.simpleRangedImpl,
    [RAC.IMPROVISED_ATTACK]: Weapon.simpleImprovisedAttackImpl,
    [RAC.THROW_ATTACK]: Weapon.simpleThrowAttackImpl,
    [RAC.TOTAL_DEFENCE]: RuleState.doTotalDefenceState,
    [RAC.EQUIP]: Impl.doEquip,
    [RAC.UNEQUIP]: Impl.doUnequip,
    [RAC.GRAB]: Impl.doEquip,
    [RAC.DROP]: Impl.doUnequip,
    [RAC.CAST_SPELL]: {
        [RSN.SHOCKING_GRASP]: SpellImpl.doShockGrasp
    },
    [RAC.COMBAT_MANEUVERS]: {
        [RCML.GRAPPLE]: CMBImpl.doGrapple,
        [RCML.DISARM]: CMBImpl.doDisarm,
        [RCML.TRIP]: Val.noValidation,
        [RCML.BULL_RUSH]: Val.noValidation,
        [RCML.DIRTY_TRICK]: Val.noValidation
    },
    [RAC.ACTIVATE_STATE]: {
        [RBC.COMBAT_EXPERTISE]: RuleState.activateCombatExpertise,
        [RBC.FIGHTING_DEFENSIVELY]: RuleState.activateFightingDefensively,
    },
    [RAC.DEACTIVATE_STATE]: {
        [RBC.COMBAT_EXPERTISE]: RuleState.removeStateAction,
        [RBC.FIGHTING_DEFENSIVELY]: RuleState.removeStateAction,
    }
};

export const validation = {
    [RAC.MOVE]: Val.moveValidation,
    [RAC.CHARGE]: Val.moveValidation,
    [RAC.FIVE_FOOT_STEP]: Val.fiveFootValidation,
    [RAC.MELEE_ATTACK]: Val.attackValidation,
    [RAC.RANGED_ATTACK]: Val.noValidation,
    [RAC.TOTAL_DEFENCE]: Val.noValidation,
    [RAC.IMPROVISED_ATTACK]: Val.noValidation,
    [RAC.THROW_ATTACK]: Val.noValidation,
    [RAC.EQUIP]: Val.noValidation,
    [RAC.UNEQUIP]: Val.noValidation,
    [RAC.DROP]: Val.noValidation,
    [RAC.GRAB]: Val.noValidation,
    [RAC.COMBAT_MANEUVERS]: {
        [RCML.GRAPPLE]: Val.noValidation,
        [RCML.DISARM]: Val.noValidation,
        [RCML.TRIP]: Val.noValidation,
        [RCML.BULL_RUSH]: Val.noValidation,
        [RCML.DIRTY_TRICK]: Val.noValidation
    },
    [RAC.CAST_SPELL]: {
        [RSN.SHOCKING_GRASP]: Val.touchCheck
    },
    [RAC.ACTIVATE_STATE]: {
        [RBC.COMBAT_EXPERTISE]: Val.noValidation,
        [RBC.FIGHTING_DEFENSIVELY]: Val.noValidation,
    },
    [RAC.DEACTIVATE_STATE]: {
        [RBC.COMBAT_EXPERTISE]: Val.noValidation,
        [RBC.FIGHTING_DEFENSIVELY]: Val.noValidation,
    }
};