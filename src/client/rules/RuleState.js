/**
 * Created by LastBerserk on 18.01.2020.
 */

import RuleEffect from "./RuleEffect";
import RuleConstants from "./RuleConstants";
import RuleSkillConstants from "./constants/RuleSkillConstants";
import RuleCharacterChangesBean from "./RuleCharacterChangesBean";
import RuleBuffConstants from "./constants/RuleBuffConstants";
import RuleBuff from "./RuleBuff";

function notifyBuffs(buff) {
    RuleCharacterChangesBean.addBuffModification(buff.targetId, buff.toJson());
}

function notifyDeletion(buff) {
    RuleCharacterChangesBean.addBuffModification(buff.targetId, buff.toJson(true));
}


export default class RuleState {
    /**
     * @param {RuleActions} action
     */
    static doRage(action) {
        const buff = new RuleBuff(RuleBuffConstants.RAGE);
        // TODO add duration
        buff.gameObject = action.performerObject;
        const buffs = buff.gameObject.buffs;
        buff.onCreate = () => {
            RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject, RuleConstants.STAT_STRENGTH, 4);
            RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject, RuleConstants.STAT_DEXTERITY, 4);
            notifyBuffs(buff);
            buff.gameObject.recalculate();
        };
        buff.onEnd = () => {
            RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject, RuleConstants.STAT_STRENGTH, -4);
            RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject, RuleConstants.STAT_DEXTERITY, -4);
            notifyDeletion(buff);
            RuleState.doFatigue(action);
        };
        buffs.addDM(buff);
    }

    /**
     * @param {RuleActions} action
     * @param {RuleBuff} buff
     */
    static doFatigue(action, buff) {
        // TODO add duration
        buff.gameObject = action.performerObject;
        const buffs = buff.gameObject.buffs;
        const strEffect = new RuleEffect(RuleConstants.STAT_STRENGTH, -2);
        const dexEffect = new RuleEffect(RuleConstants.STAT_DEXTERITY, -2);
        buff.onCreate = () => {
            buffs.addEffect(strEffect);
            buffs.addEffect(dexEffect);
        };
        buff.onEnd = () => {
            buffs.removeEffect(strEffect);
            buffs.removeEffect(dexEffect);
        };
        buffs.add(buff);
        notifyBuffs(action, buff);
    }

    /**
     * @param {RuleActions} action
     * @param {RuleBuff} buff
     */
    static doFightingDefensively(action, buff) {
        buff.duration = 1;
        buff.gameObject = action.performerObject;
        const buffs = buff.gameObject.buffs;
        const ranks = buff.gameObject.get(RuleSkillConstants.SKILL_ACROBATICS_RANKS);
        const acEffect = new RuleEffect(RuleConstants.DODGE, ranks >= 3 ? 3 : 2);
        const attackEffect = new RuleEffect(RuleConstants.MODIFIER_ATTACK, -4);
        buff.onCreate = () => {
            buffs.addEffect(acEffect);
            buffs.addEffect(attackEffect);
        };
        buff.onEnd = () => {
            buffs.removeEffect(acEffect);
            buffs.removeEffect(attackEffect);
        };
        buffs.add(buff);
        notifyBuffs(action, buff);
    }

    /**
     * @param {RuleActions} action
     */
    static doTotalDefenceState(action) {
        const buff = new RuleBuff(RuleBuffConstants.TOTAL_DEFENSE);
        buff.duration = 1;
        buff.setTarget(action.performerObject);
        const buffs = buff.gameObject.buffs;
        const ranks = buff.gameObject.get(RuleSkillConstants.SKILL_ACROBATICS_RANKS);
        const acEffect = ranks >= 3 ? 6 : 4;
        buff.onCreate = () =>  {
            RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.DODGE, acEffect);
            notifyBuffs(buff);
            buff.gameObject.recalculate();
        };
        buff.onEnd = () => {
            RuleCharacterChangesBean.addDataModificationInstantly(buff.gameObject,  RuleConstants.DODGE, -acEffect);
            notifyDeletion(buff);
            buff.gameObject.recalculate();
        };
        buffs.addDM(buff);
    }
}