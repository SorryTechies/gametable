/**
 * Created by LastBerserk on 22.03.2020.
 */

import RuleEffect from "../buff/RuleEffect";
import RuleBuffConstants from "../constants/RuleBuffConstants";
import RuleConstants from "../constants/RuleStatConstants";

export function getTotalDefenceAC() {
    return new RuleEffect(
        RuleBuffConstants.TOTAL_DEFENSE,
        RuleConstants.DODGE
    );
}

export function getChargeAC() {
    return new RuleEffect(
        RuleBuffConstants.CHARGE,
        RuleConstants.DODGE
    );
}

export function getChargeAttack() {
    return new RuleEffect(
        RuleBuffConstants.CHARGE,
        RuleConstants.ATTACK_FLAT
    );
}

export function getCombatExpertiseAC() {
    return new RuleEffect(
        RuleBuffConstants.COMBAT_EXPERTISE,
        RuleConstants.DODGE
    );
}

export function getCombatExpertiseAttack() {
    return new RuleEffect(
        RuleBuffConstants.COMBAT_EXPERTISE,
        RuleConstants.ATTACK_FLAT
    );
}

export function getFightingDefenseAC() {
    return new RuleEffect(
        RuleBuffConstants.FIGHTING_DEFENSIVELY,
        RuleConstants.DODGE
    );
}

export function getFightingDefenseAttack() {
    return new RuleEffect(
        RuleBuffConstants.FIGHTING_DEFENSIVELY,
        RuleConstants.ATTACK_FLAT
    );
}