/**
 * Created by LastBerserk on 29.02.2020.
 */

import RuleBuffConstants from "../constants/RuleBuffConstants";
import RuleState from "../RuleState";

export const buffImplementation = {
    [RuleBuffConstants.TOTAL_DEFENSE]: RuleState.doTotalDefenceState,
    [RuleBuffConstants.FIGHTING_DEFENSIVELY]: RuleState.doFightingDefensively,
    [RuleBuffConstants.FATIGUE]: RuleState.doFatigue,
    [RuleBuffConstants.RAGE]: RuleState.doRage
};

