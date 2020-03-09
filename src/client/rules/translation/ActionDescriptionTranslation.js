/**
 * Created by LastBerserk on 14.03.2020.
 */

import SupportedLanguages from "./SupportedLanguages";
import RuleTranslationConstants from "../constants/RuleTranslationConstants";
import RuleBuffConstants from "../constants/RuleBuffConstants";

export default {
    [SupportedLanguages.ENG]: {
        [RuleTranslationConstants.ATTACK_HIT]: v =>
            `${v[0]} attacks ${v[1]} ${v[2]} with ${v[3]} dealing ${v[4]} ${v[5]} damage.`,
        [RuleTranslationConstants.ATTACK_MISS]: v =>
            `${v[0]} attacks ${v[1]} ${v[2]} with ${v[3]} and misses.`,
        [RuleBuffConstants.TOTAL_DEFENSE]: v =>
            `${v[0]} enters total defence!`
    }
}