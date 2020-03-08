/**
 * Created by LastBerserk on 07.03.2020.
 */

import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleSkillConstants from "../constants/RuleSkillConstants";
import RuleConstants from "../RuleConstants";

function notifyBuffs(buff) {
    RuleCharacterChangesBean.addBuffModification(buff.targetId, buff.toJson());
}

function notifyDeletion(buff) {
    RuleCharacterChangesBean.addBuffModification(buff.targetId, buff.toJson(true));
}

export function totalDefenceImpl(buff) {
    const ranks = buff.gameObject.get(RuleSkillConstants.SKILL_ACROBATICS_RANKS);
    const acEffect = ranks >= 3 ? 6 : 4;
    buff.onCreate = () =>  {
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.DODGE, acEffect);
        notifyBuffs(buff);
    };
    buff.onEnd = () => {
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.DODGE, -acEffect);
        notifyDeletion(buff);
    };
}

export function chargeBuffImpl(buff) {
    buff.onCreate = () =>  {
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.DODGE, -2);
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.ATTACK_FLAT, 2);
        notifyBuffs(buff);
    };
    buff.onEnd = () => {
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.DODGE, 2);
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.ATTACK_FLAT, -2);
        notifyDeletion(buff);
    };
}

export function combatExpertiseImpl(buff) {
    buff.dispellable = true;
    const bab =  buff.gameObject.get(RuleConstants.BAB) >= 4;
    const bonus = bab ? 2 : 1;
    const attack =  bab ? -2 : -1;
    buff.onCreate = () =>  {
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.DODGE, bonus);
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.COMBAT_MANEUVER_BONUS, attack);
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.ATTACK_FLAT, attack);
        notifyBuffs(buff);
    };
    buff.onEnd = () => {
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.DODGE, -bonus);
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.COMBAT_MANEUVER_BONUS, -attack);
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.ATTACK_FLAT, -attack);
        notifyDeletion(buff);
    };
}

export function fightingDefensively(buff) {
    buff.dispellable = true;
    const acEffect = buff.gameObject.get(RuleSkillConstants.SKILL_ACROBATICS_RANKS) >= 3 ? 3 : 2;
    const attackEffect = -4;
    buff.onCreate = () =>  {
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.DODGE, acEffect);
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.COMBAT_MANEUVER_BONUS, attackEffect);
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.ATTACK_FLAT, attackEffect);
        notifyBuffs(buff);
    };
    buff.onEnd = () => {
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.DODGE, -acEffect);
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.COMBAT_MANEUVER_BONUS, -attackEffect);
        RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.ATTACK_FLAT, -attackEffect);
        notifyDeletion(buff);
    };
}