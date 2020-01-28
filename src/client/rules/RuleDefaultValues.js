/**
 * Created by LastBerserk on 17.01.2020.
 */

import RuleConstants from "./RuleConstants";
import RuleSkillConstants from "./constants/RuleSkillConstants";

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
    }
}