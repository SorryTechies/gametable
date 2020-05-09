/**
 * Created by LastBerserk on 14.03.2020.
 */

import SupportedLanguages from "./SupportedLanguages";
import BUFFS from "../constants/RuleBuffConstants";
import ACTIONS from "../constants/RuleActionsConstants";
import * as CMB from "../constants/RuleCombatManeuverList";

export default {
    [SupportedLanguages.ENG]: {
        [true]: {
            [ACTIONS.MELEE_ATTACK]: v =>
                `${v[0]} melee attacks ${v[1]} ${v[2]} with ${v[3]} dealing ${v[4]} damage.`,
            [ACTIONS.RANGED_ATTACK]: v =>
                `${v[0]} shoots ${v[1]} ${v[2]} with ${v[3]} dealing ${v[4]} damage.`,
            [ACTIONS.IMPROVISED_ATTACK]: v =>
                `${v[0]} improvised attacks ${v[1]} ${v[2]} with ${v[3]} dealing ${v[4]} damage.`,
            [ACTIONS.THROW_ATTACK]: v =>
                `${v[0]} throws ${v[3]} at ${v[1]} ${v[2]} dealing ${v[4]} damage.`,
            [BUFFS.TOTAL_DEFENSE]: v =>
                `${v[0]} enters total defence!`,
            [CMB.NORMAL.GRAPPLE]: v =>
            `${v[0]} grapples ${v[1]} ( ${v[2]} ) and succeeds.`
        },
        [false]: {
            [ACTIONS.MELEE_ATTACK]: v =>
                `${v[0]} melee attacks ${v[1]} ${v[2]} with ${v[3]} and misses.`,
            [ACTIONS.RANGED_ATTACK]: v =>
                `${v[0]} shoots ${v[1]} ${v[2]} with ${v[3]} and misses.`,
            [ACTIONS.IMPROVISED_ATTACK]: v =>
                `${v[0]} improvised attacks ${v[1]} ${v[2]} with ${v[3]} and misses.`,
            [ACTIONS.THROW_ATTACK]: v =>
                `${v[0]} throws ${v[3]} at ${v[1]} ${v[2]} and misses.`,
            [CMB.NORMAL.GRAPPLE]: v =>
                `${v[0]} grapples ${v[1]} ( ${v[2]} ) and fails.`
        }
    }
}