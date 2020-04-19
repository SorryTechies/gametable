/**
 * Created by LastBerserk on 17.01.2020.
 */

import CONST from "./constants/RuleStatConstants";
import SKILLS from "./constants/RuleSkillConstants";
import OBJ_CONST from "./constants/RuleGameObjectConstants";

const DEFAULT_VALUES = {
    [CONST.STAT_STRENGTH]: 10,
    [CONST.STAT_DEXTERITY]: 10,
    [CONST.STAT_CONSTITUTION]: 10,
    [CONST.STAT_INTELLIGENCE]: 10,
    [CONST.STAT_WISDOM]: 10,
    [CONST.STAT_CHARISMA]: 10,

    [CONST.LEVEL]: 1,
    [CONST.MOVE_SPEED]: 30,

    [CONST.HEALTH_DIE]: 8,
    [CONST.HEALTH_DIE_PER_LEVEL]: 6,

    [SKILLS.CLASS_SKILLS_ARRAY]: [],
    [CONST.SPELL_ARRAY]: [],
};

const setIfNull = (key, val) => !DEFAULT_VALUES[key] ? DEFAULT_VALUES[key] = val : null;
Object.values(CONST).forEach(key => setIfNull(key, 0));
Object.values(SKILLS).forEach(key => setIfNull(key, 0));
Object.values(OBJ_CONST).forEach(key => setIfNull(key, 0));

export default class RuleDefaultValues {
    static getDefault(key) {
        return DEFAULT_VALUES[key];
    }
}