/**
 * Created by LastBerserk on 18.01.2020.
 */

import RuleBuff from "./RuleBuff";
import RuleEffect from "./RuleEffect";
import RuleConstants from "./RuleConstants";
import RuleBuffConstants from "./constants/RuleBuffConstants";
import RuleSkillConstants from "./constants/RuleSkillConstants";

export default class RuleState {
    static doRage(character) {
        const buff = new RuleBuff(RuleBuffConstants.RAGE, character);
        const strEffect = new RuleEffect(RuleConstants.STAT_STRENGTH, 4);
        const dexEffect = new RuleEffect(RuleConstants.STAT_DEXTERITY, 4);
        buff.onCreate = () => {
            character.addEffect(strEffect);
            character.addEffect(dexEffect);
        };
        buff.onEnd = () => {
            character.removeEffect(strEffect);
            character.removeEffect(dexEffect);
            RuleState.doFatigue(character);
        };
        character.buffs.add(buff);
    }

    static doFatigue(character) {
        const buff = new RuleBuff(RuleBuffConstants.FATIGUE, character);
        const strEffect = new RuleEffect(RuleConstants.STAT_STRENGTH, -2);
        const dexEffect = new RuleEffect(RuleConstants.STAT_DEXTERITY, -2);
        buff.onCreate = () => {
            character.addEffect(strEffect);
            character.addEffect(dexEffect);
        };
        buff.onEnd = () => {
            character.removeEffect(strEffect);
            character.removeEffect(dexEffect);
        };
        character.buffs.add(buff);
    }

    static doFightingDefensively(character) {
        const buff = new RuleBuff(RuleBuffConstants.FIGHTING_DEFENSIVELY, character);
        const ranks = character.get("ranks_acrobatics");
        const acEffect = new RuleEffect(RuleConstants.DODGE, ranks >= 3 ? 3 : 2);
        const attackEffect = new RuleEffect(RuleConstants.MODIFIER_ATTACK, -4);
        buff.onCreate = () => {
            character.addEffect(acEffect);
            character.addEffect(attackEffect);
        };
        buff.onEnd = () => {
            character.removeEffect(acEffect);
            character.removeEffect(attackEffect);
        };
        character.buffs.add(buff);
    }

    /** @param {RuleActions} action */
    static doTotalDefenceState(action) {
        const object = action.performerObject;
        const buff = new RuleBuff(RuleBuffConstants.TOTAL_DEFENSE);
        buff.gameObject = object;
        const ranks = object.get(RuleSkillConstants.SKILL_ACROBATICS_RANKS);
        const acEffect = new RuleEffect(RuleConstants.DODGE, ranks >= 3 ? 6 : 4);
        buff.onCreate = () => object.buffs.addEffect(acEffect);
        buff.onEnd = () => object.buffs.removeEffect(acEffect);
        action.performerObject.buffs.add(buff);
    }
}