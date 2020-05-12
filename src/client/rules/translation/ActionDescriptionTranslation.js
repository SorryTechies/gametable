/**
 * Created by LastBerserk on 14.03.2020.
 */

import SupportedLanguages from "./SupportedLanguages";
import BUFFS from "../constants/RuleBuffConstants";
import ACTIONS from "../constants/RuleActionsConstants";
import CMB from "../constants/RuleCombatManeuverList";

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
            [CMB.GRAPPLE]: v =>
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
            [CMB.GRAPPLE]: v =>
                `${v[0]} grapples ${v[1]} ( ${v[2]} ) and fails.`
        }
    },
    [SupportedLanguages.RU]: {
        [true]: {
            [ACTIONS.MELEE_ATTACK]: v =>
                `${v[0]} бьет ${v[1]} ${v[2]} с ${v[3]} и наносит ${v[4]} урона.`,
            [ACTIONS.RANGED_ATTACK]: v =>
                `${v[0]} стреляет ${v[1]} ${v[2]} из ${v[3]} и наносит ${v[4]} урона.`,
            [ACTIONS.IMPROVISED_ATTACK]: v =>
                `${v[0]} атакует ${v[1]} ${v[2]} с ${v[3]} и наносит ${v[4]} урона.`,
            [ACTIONS.THROW_ATTACK]: v =>
                `${v[0]} метает ${v[3]} в ${v[1]} ${v[2]} и наносит ${v[4]} урона.`,
            [BUFFS.TOTAL_DEFENSE]: v =>
                `${v[0]} активировал Глухую обороны`,
            [CMB.GRAPPLE]: v =>
                `${v[0]} успешно проводит захват ${v[1]} ( ${v[2]} )`

        },
        [false]: {
            [ACTIONS.MELEE_ATTACK]: v =>
                `${v[0]} бьет ${v[1]} ${v[2]} с ${v[3]} , но промахивается.`,
            [ACTIONS.RANGED_ATTACK]: v =>
                `${v[0]} стреляет ${v[1]} ${v[2]} из ${v[3]}, но промахивается.`,
            [ACTIONS.IMPROVISED_ATTACK]: v =>
                `${v[0]} атакует ${v[1]} ${v[2]} с ${v[3]}, но промахивается.`,
            [ACTIONS.THROW_ATTACK]: v =>
                `${v[0]} метает ${v[3]} в ${v[1]} ${v[2]}, но промахивается.`,
            [CMB.GRAPPLE]: v =>
                `${v[0]} не смог схватить ${v[1]} ( ${v[2]} ).`
        }
    }
}
