/**
 * Created by LastBerserk on 17.01.2020.
 */

import RuleConstants from "./RuleConstants";
import RuleSkillConstants from "./constants/RuleSkillConstants";
import RuleGameObjectConstants from "./constants/RuleGameObjectConstants";

export default class RuleDefaultValues {
    /**
     * @param {RuleCharacter} character
     */
    static setDefault(character) {
        const setIfNull = (key, val) => !character.getOriginal(key) ? character.setOriginal(key, val) : null;
        Object.values(RuleConstants).forEach(key => setIfNull(key, 0));
        Object.values(RuleSkillConstants).forEach(key => setIfNull(key, 0));
        setIfNull(RuleConstants.STAT_STRENGTH, 10);
        setIfNull(RuleConstants.STAT_DEXTERITY, 10);
        setIfNull(RuleConstants.STAT_CONSTITUTION, 10);
        setIfNull(RuleConstants.STAT_INTELLIGENCE, 10);
        setIfNull(RuleConstants.STAT_WISDOM, 10);
        setIfNull(RuleConstants.STAT_CHARISMA, 10);

        setIfNull(RuleConstants.LEVEL, 1);

        setIfNull(RuleConstants.HEALTH_DIE, 8);
        setIfNull(RuleConstants.HEALTH_DIE_PER_LEVEL, 6);

        setIfNull(RuleConstants.MOVE_SPEED, 30);

        setIfNull(RuleSkillConstants.CLASS_SKILLS_ARRAY, []);
        setIfNull(RuleConstants.SPELL_ARRAY, ["shock_grasp"])
    }

    /** @param {GameObject} obj */
    static setDefaultObjectValues(obj) {
        if (!obj.data) obj.data = {};
        const setIfNull = (key, val) => !obj.data ? obj.data[key] = val : null;
        Object.values(RuleGameObjectConstants).forEach(key => setIfNull(key, 0));
        if (!Array.isArray(obj.buffs)) obj.buffs = [];
        if (!obj.position) obj.position = {x: 1, y:1};
    }
}