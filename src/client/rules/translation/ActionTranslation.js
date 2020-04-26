/**
 * Created by LastBerserk on 14.03.2020.
 */

import SupportedLanguages from "./SupportedLanguages";
import RuleActionConstants from "../constants/RuleActionsConstants";

export default {
    [SupportedLanguages.ENG]: {
        [RuleActionConstants.ACTIVATE_STATE]: "Activate State",
        [RuleActionConstants.DEACTIVATE_STATE]: "Deactivate State",
        [RuleActionConstants.CAST_SPELL]: "Cast Spell",
        [RuleActionConstants.TOTAL_DEFENCE]: "Total Defence",
        [RuleActionConstants.FIVE_FOOT_STEP]: "Five Foot Step",
        [RuleActionConstants.MELEE_ATTACK]: "Melee Attack",
        [RuleActionConstants.RANGED_ATTACK]: "Ranged Attack",
        [RuleActionConstants.THROW_ATTACK]: "Throw",
        [RuleActionConstants.COMBAT_MANEUVERS]: "Combat Maneuvers",
        [RuleActionConstants.IMPROVISED_ATTACK]: "Improvised attack",
    }
}