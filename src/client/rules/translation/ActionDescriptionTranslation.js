/**
 * Created by LastBerserk on 14.03.2020.
 */

import SupportedLanguages from "./SupportedLanguages";
import RuleBuffConstants from "../constants/RuleBuffConstants";
import RuleActionConstants from "../constants/RuleActionsConstants";

export default {
    [SupportedLanguages.ENG]: {
        [true]: {
            [RuleActionConstants.MELEE_ATTACK]: v =>
                `${v[0]} melee attacks ${v[1]} ${v[2]} with ${v[3]} dealing ${v[4]} ${v[5]} damage.`,
            [RuleActionConstants.RANGED_ATTACK]: v =>
                `${v[0]} shoots ${v[1]} ${v[2]} with ${v[3]} dealing ${v[4]} ${v[5]} damage.`,
            [RuleActionConstants.IMPROVISED_ATTACK]: v =>
                `${v[0]} improvised attacks ${v[1]} ${v[2]} with ${v[3]} dealing ${v[4]} ${v[5]} damage.`,
            [RuleActionConstants.THROW_ATTACK]: v =>
                `${v[0]} throws ${v[3]} at ${v[1]} ${v[2]} dealing ${v[4]} ${v[5]} damage.`,
            [RuleBuffConstants.TOTAL_DEFENSE]: v =>
                `${v[0]} enters total defence!`
        },
        [false]: {
            [RuleActionConstants.MELEE_ATTACK]: v =>
                `${v[0]} melee attacks ${v[1]} ${v[2]} with ${v[3]} and misses.`,
            [RuleActionConstants.RANGED_ATTACK]: v =>
                `${v[0]} shoots ${v[1]} ${v[2]} with ${v[3]} and misses.`,
            [RuleActionConstants.IMPROVISED_ATTACK]: v =>
                `${v[0]} improvised attacks ${v[1]} ${v[2]} with ${v[3]} and misses.`,
            [RuleActionConstants.THROW_ATTACK]: v =>
                `${v[0]} throws ${v[3]} at ${v[1]} ${v[2]} and misses.`,
        }
    }
}