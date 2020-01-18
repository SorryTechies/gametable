/**
 * Created by LastBerserk on 17.01.2020.
 */

import RuleConstants from "./RuleConstants";

export default class RuleDefaultValues {
    /**
     * @param {RuleCharacter} character
     */
    static setDefault(character) {
        Object.values(RuleConstants).forEach(key => character.setOriginal(key, 0));
        character.setOriginal(RuleConstants.STAT_STRENGTH, 10);
        character.setOriginal(RuleConstants.STAT_DEXTERITY, 10);
        character.setOriginal(RuleConstants.STAT_CONSTITUTION, 10);
        character.setOriginal(RuleConstants.STAT_INTELLIGENCE, 10);
        character.setOriginal(RuleConstants.STAT_WISDOM, 10);
        character.setOriginal(RuleConstants.STAT_CHARISMA, 10);

        character.setOriginal(RuleConstants.LEVEL, 1);

        character.setOriginal(RuleConstants.HEALTH_DIE, 8);
        character.setOriginal(RuleConstants.HEALTH_DIE_PER_LEVEL, 6);
    }
}