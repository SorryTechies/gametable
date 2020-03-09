/**
 * Created by LastBerserk on 14.03.2020.
 */

import SupportedLanguages from "./SupportedLanguages";
import RuleActionConstants from "../constants/RuleActionsConstants";

export default {
    [SupportedLanguages.ENG]: {
        [RuleActionConstants.ACTIVATE_STATE]: "Activate state",
        [RuleActionConstants.DEACTIVATE_STATE]: "Deactivate state",
        [RuleActionConstants.CAST_SPELL]: "Cast spell",
        [RuleActionConstants.TOTAL_DEFENCE]: "Total defence",
        [RuleActionConstants.FIVE_FOOT_STEP]: "Five foot step",
        [RuleActionConstants.MELEE_ATTACK]: "Melee attack",
        [RuleActionConstants.RANGED_ATTACK]: "Ranged attack",
    }
}