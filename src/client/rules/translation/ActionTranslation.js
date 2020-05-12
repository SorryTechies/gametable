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
    },
       [SupportedLanguages.RU]: {
        [RuleActionConstants.ACTIVATE_STATE]: "Войти в защитную стойку",
        [RuleActionConstants.DEACTIVATE_STATE]: "Выйти из стойки",
        [RuleActionConstants.CAST_SPELL]: "Читает заклинание",
        [RuleActionConstants.TOTAL_DEFENCE]: "Глухая оборона,
        [RuleActionConstants.FIVE_FOOT_STEP]: "5-футовый шаг",
        [RuleActionConstants.MELEE_ATTACK]: "Атака в ближнем бою",
        [RuleActionConstants.RANGED_ATTACK]: "Атака в дальнем бою",
        [RuleActionConstants.THROW_ATTACK]: "Метнуть",
        [RuleActionConstants.COMBAT_MANEUVERS]: "Боевые маневры",// is it f** normal?
        [RuleActionConstants.IMPROVISED_ATTACK]: "Импровизированная атака"
       }
}
