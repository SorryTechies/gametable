/**
 * Created by LastBerserk on 07.03.2020.
 */

import * as RuleBuffImpl from "../impl/RuleBuffImpl";
import RuleBuffConstants from "../constants/RuleBuffConstants";

export default {
    [RuleBuffConstants.COMBAT_EXPERTISE]: RuleBuffImpl.combatExpertiseImpl,
    [RuleBuffConstants.FIGHTING_DEFENSIVELY]: RuleBuffImpl.fightingDefensively,
    [RuleBuffConstants.TOTAL_DEFENSE]: RuleBuffImpl.totalDefenceImpl
};