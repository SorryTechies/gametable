/**
 * Created by LastBerserk on 17.01.2020.
 */


import CONST from "../constants/RuleStatConstants";
import SKILL_CONST from "../constants/RuleSkillsStatConstants";
import SKILLS from "../constants/RuleSkillConstants";
import FEATS from "../constants/RuleFeatsConstants";

export const dodgeCalc = cha => cha.set(CONST.DODGE, cha.get(CONST.MODIFIER_DODGE) +
    cha.get(CONST.MOD_DEXTERITY));

/**
 * AC calculation.
 * @param {RuleGameObject} gameObject
 */
export const defenceCalc = gameObject => {
    const tffac = 10 + gameObject.get(CONST.MODIFIER_DEFLECT) - gameObject.get(CONST.SIZE);
    const ac = tffac +
        gameObject.get(CONST.MODIFIER_ARMOR) +
        gameObject.get(CONST.DODGE);
    const setIfLesser = val => ac > val ? val : ac;
    const tac = tffac + gameObject.get(CONST.DODGE);
    const ffac = tffac + gameObject.get(CONST.MODIFIER_ARMOR);

    gameObject.set(CONST.DEFENCE_AC, ac);
    gameObject.set(CONST.DEFENCE_TOUCH_AC, setIfLesser(tac));
    gameObject.set(CONST.DEFENCE_FLAT_FOOTED_AC, setIfLesser(ffac));
    gameObject.set(CONST.DEFENCE_TFF_AC, setIfLesser(tffac));
};

/**
 * Stat modificators calculation.
 * @param {RuleGameObject} gameObject
 */
export const statCalc = gameObject => {
    const calcStats = (val) => {
        const mod = (val - 10) / 2;
        return mod < 0 ? Math.floor(mod) : Math.floor(mod);
    };
    gameObject.set(CONST.MOD_STRENGTH, calcStats(gameObject.get(CONST.STAT_STRENGTH)));
    gameObject.set(CONST.MOD_DEXTERITY, calcStats(gameObject.get(CONST.STAT_DEXTERITY)));
    gameObject.set(CONST.MOD_CONSTITUTION, calcStats(gameObject.get(CONST.STAT_CONSTITUTION)));
    gameObject.set(CONST.MOD_INTELLIGENCE, calcStats(gameObject.get(CONST.STAT_INTELLIGENCE)));
    gameObject.set(CONST.MOD_WISDOM, calcStats(gameObject.get(CONST.STAT_WISDOM)));
    gameObject.set(CONST.MOD_CHARISMA, calcStats(gameObject.get(CONST.STAT_CHARISMA)));
};

export const healthCalc = gm => {
    gm.set(CONST.HEALTH_DIE_PER_LEVEL, gm.get(CONST.MOD_CONSTITUTION));
    let addHP = 0;
    const lvl = gm.get(CONST.LEVEL);
    if (gm.ruleCharacter.hasFeat(FEATS.TOUGHNESS)) addHP += lvl > 3 ? lvl : 3;
    gm.set(CONST.MAX_HEALTH, addHP + gm.get(CONST.HEALTH_DIE) + ((gm.get(CONST.HEALTH_DIE_PER_LEVEL - 1) * lvl)));
};

export const attackBonusCalc = gm => {
    gm.set(CONST.AMOUNT_OF_ATTACKS, Math.floor(gm.get(CONST.BAB)/5) + 1);
    gm.set(CONST.ATTACK_STR,
        gm.get(CONST.BAB) +
        gm.get(CONST.MOD_STRENGTH) +
        gm.get(CONST.MODIFIER_ATTACK));
    gm.set(CONST.ATTACK_DEX,
        gm.get(CONST.BAB) +
        gm.get(CONST.MOD_DEXTERITY) +
        gm.get(CONST.MODIFIER_ATTACK));
    gm.set(CONST.ATTACK_FLAT,
        gm.get(CONST.BAB) +
        gm.get(CONST.MODIFIER_ATTACK));
    gm.set(CONST.INITIATIVE, gm.get(CONST.MOD_DEXTERITY));
};

export const saveCalc = gameObject => {
    gameObject.set(CONST.SAVE_FORTITUDE,
        gameObject.get(CONST.MODIFIER_SAVE_FORTITUDE) +
        gameObject.get(CONST.CLASS_SAVE_FORTITUDE) +
        gameObject.get(CONST.MOD_CONSTITUTION));
    gameObject.set(CONST.SAVE_REFLEX,
        gameObject.get(CONST.MODIFIER_SAVE_REFLEX) +
        gameObject.get(CONST.CLASS_SAVE_REFLEX) +
        gameObject.get(CONST.MOD_DEXTERITY));
    gameObject.set(CONST.SAVE_WILL,
        gameObject.get(CONST.MODIFIER_SAVE_WILL) +
        gameObject.get(CONST.CLASS_SAVE_WILL) +
        gameObject.get(CONST.MOD_WISDOM));
};

export const combatManeuverCalc = gameObject => {
    gameObject.set(CONST.COMBAT_MANEUVER_BONUS, gameObject.get(CONST.BAB) +
        gameObject.get(CONST.MOD_STRENGTH) +
        gameObject.get(CONST.MODIFIER_CMB));
    gameObject.set(CONST.COMBAT_MANEUVER_DEFENCE, 10 + gameObject.get(CONST.BAB) +
        gameObject.get(CONST.MOD_STRENGTH) +
        gameObject.get(CONST.DODGE) +
        gameObject.get(CONST.MODIFIER_DEFLECT) +
        gameObject.get(CONST.MODIFIER_CMD));
};

export const skillCalc = gm => {
    gm.set(CONST.SKILL_RANKS_PER_LEVEL, gm.get(CONST.MOD_INTELLIGENCE));
    gm.set(CONST.SKILL_RANKS, gm.get(CONST.SKILL_RANKS_PER_LEVEL) * gm.get(CONST.LEVEL));

    const getSkillModifier = key => {
        if (SKILL_CONST.SKILLS_STR.includes(key)) return gm.get(CONST.MOD_STRENGTH) + gm.get(CONST.ARMOR_PENALTY);
        if (SKILL_CONST.SKILLS_DEX.includes(key)) return gm.get(CONST.MOD_DEXTERITY) + gm.get(CONST.ARMOR_PENALTY);
        if (SKILL_CONST.SKILLS_INT.includes(key)) return gm.get(CONST.MOD_INTELLIGENCE);
        if (SKILL_CONST.SKILLS_WIS.includes(key)) return gm.get(CONST.MOD_WISDOM);
        if (SKILL_CONST.SKILLS_CHA.includes(key)) return gm.get(CONST.MOD_CHARISMA);
    };
    const processRanks = key => {
        const ranks = gm.get(key);
        if (gm.get(SKILLS.CLASS_SKILLS_ARRAY).includes(key) && ranks > 0) {
            return ranks + 2;
        } else {
            return ranks;
        }
    };

    const setGM = (key, ranks) => gm.set(key, processRanks(ranks) + getSkillModifier(key));
    // @formatter:off
    setGM(SKILLS.SKILL_ACROBATICS,          SKILLS.SKILL_ACROBATICS_RANKS);
    setGM(SKILLS.SKILL_APPRAISE,            SKILLS.SKILL_APPRAISE_RANKS);
    setGM(SKILLS.SKILL_BLUFF,               SKILLS.SKILL_BLUFF_RANKS);
    setGM(SKILLS.SKILL_CLIMB,               SKILLS.SKILL_CLIMB_RANKS);
    setGM(SKILLS.SKILL_CRAFT,               SKILLS.SKILL_CRAFT_RANKS);
    setGM(SKILLS.SKILL_DIPLOMACY,           SKILLS.SKILL_DIPLOMACY_RANKS);
    setGM(SKILLS.SKILL_DISABLE_DEVICE,      SKILLS.SKILL_DISABLE_DEVICE_RANKS);
    setGM(SKILLS.SKILL_DISGUISE,            SKILLS.SKILL_ESCAPE_ARTIST_RANKS);
    setGM(SKILLS.SKILL_ESCAPE_ARTIST,       SKILLS.SKILL_BLUFF_RANKS);
    setGM(SKILLS.SKILL_FLY,                 SKILLS.SKILL_FLY_RANKS);
    setGM(SKILLS.SKILL_HANDLE_ANIMAL,       SKILLS.SKILL_HANDLE_ANIMAL_RANKS);
    setGM(SKILLS.SKILL_HEAL,                SKILLS.SKILL_HEAL_RANKS);
    setGM(SKILLS.SKILL_INTIMIDATE,          SKILLS.SKILL_INTIMIDATE_RANKS);
    setGM(SKILLS.SKILL_LINGUISTICS,         SKILLS.SKILL_LINGUISTICS_RANKS);
    setGM(SKILLS.SKILL_PERCEPTION,          SKILLS.SKILL_PERCEPTION_RANKS);
    setGM(SKILLS.SKILL_PERFORM,             SKILLS.SKILL_PERFORM_RANKS);
    setGM(SKILLS.SKILL_PROFESSION,          SKILLS.SKILL_PROFESSION_RANKS);
    setGM(SKILLS.SKILL_RIDE,                SKILLS.SKILL_RIDE_RANKS);
    setGM(SKILLS.SKILL_SENSE_MOTIVE,        SKILLS.SKILL_SENSE_MOTIVE_RANKS);
    setGM(SKILLS.SKILL_SLEIGHT_OF_HAND,     SKILLS.SKILL_SLEIGHT_OF_HAND_RANKS);
    setGM(SKILLS.SKILL_SPELLCRAFT,          SKILLS.SKILL_SPELLCRAFT);
    setGM(SKILLS.SKILL_STEALTH,             SKILLS.SKILL_STEALTH_RANKS);
    setGM(SKILLS.SKILL_SURVIVAL,            SKILLS.SKILL_SURVIVAL_RANKS);
    setGM(SKILLS.SKILL_SWIM,                SKILLS.SKILL_SWIM_RANKS);
    setGM(SKILLS.SKILL_USE_MAGIC_DEVICE,    SKILLS.SKILL_USE_MAGIC_DEVICE_RANKS);

    setGM(SKILLS.SKILL_KNOWLEDGE_ARCANA,            SKILLS.SKILL_KNOWLEDGE_ARCANA_RANKS);
    setGM(SKILLS.SKILL_KNOWLEDGE_DUNGEONEERING,     SKILLS.SKILL_KNOWLEDGE_DUNGEONEERING_RANKS);
    setGM(SKILLS.SKILL_KNOWLEDGE_GEOGRAPHY,         SKILLS.SKILL_KNOWLEDGE_GEOGRAPHY_RANKS);
    setGM(SKILLS.SKILL_KNOWLEDGE_ENGINEERING,       SKILLS.SKILL_KNOWLEDGE_ENGINEERING_RANKS);
    setGM(SKILLS.SKILL_KNOWLEDGE_HISTORY,           SKILLS.SKILL_KNOWLEDGE_HISTORY_RANKS);
    setGM(SKILLS.SKILL_KNOWLEDGE_LOCAL,             SKILLS.SKILL_KNOWLEDGE_LOCAL_RANKS);
    setGM(SKILLS.SKILL_KNOWLEDGE_NOBILITY,          SKILLS.SKILL_KNOWLEDGE_NOBILITY_RANKS);
    setGM(SKILLS.SKILL_KNOWLEDGE_NATURE,            SKILLS.SKILL_KNOWLEDGE_NATURE_RANKS);
    setGM(SKILLS.SKILL_KNOWLEDGE_PLANES,            SKILLS.SKILL_KNOWLEDGE_PLANES_RANKS);
    setGM(SKILLS.SKILL_KNOWLEDGE_RELIGION,          SKILLS.SKILL_KNOWLEDGE_RELIGION_RANKS);

    setGM(SKILLS.SKILL_SCIENCE,                     SKILLS.SKILL_SCIENCE_RANKS);
    // @formatter:on
};