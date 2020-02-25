/**
 * Created by LastBerserk on 17.01.2020.
 */


import RuleConstants from "../RuleConstants";
import RuleSkillsStatConstants from "../constants/RuleSkillsStatConstants";
import RuleSkillConstants from "../constants/RuleSkillConstants";

export const dodgeCalc = cha => cha.set(RuleConstants.DODGE, cha.get(RuleConstants.MODIFIER_DODGE) +
    cha.get(RuleConstants.MOD_DEXTERITY));

/**
 * AC calculation.
 * @param {RuleGameObject} gameObject
 */
export const defenceCalc = gameObject => {
    const ac = 10 +
        gameObject.get(RuleConstants.MODIFIER_ARMOR) +
        gameObject.get(RuleConstants.DODGE) +
        gameObject.get(RuleConstants.MODIFIER_DEFLECT);
    const setIfLesser = val => ac > val ? val : ac;
    const tac = 10 +
        gameObject.get(RuleConstants.DODGE) +
        gameObject.get(RuleConstants.MODIFIER_DEFLECT);
    const ffac = 10 +
        gameObject.get(RuleConstants.MODIFIER_ARMOR) +
        gameObject.get(RuleConstants.MODIFIER_DEFLECT);
    const tffac = 10 + gameObject.get(RuleConstants.MODIFIER_DEFLECT);

    gameObject.set(RuleConstants.DEFENCE_AC, ac);
    gameObject.set(RuleConstants.DEFENCE_TOUCH_AC, setIfLesser(tac));
    gameObject.set(RuleConstants.DEFENCE_TOUCH_FLAT_FOOTED_AC, setIfLesser(ffac));
    gameObject.set(RuleConstants.DEFENCE_TFF_AC, setIfLesser(tffac));
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
    gameObject.set(RuleConstants.MOD_STRENGTH, calcStats(gameObject.get(RuleConstants.STAT_STRENGTH)));
    gameObject.set(RuleConstants.MOD_DEXTERITY, calcStats(gameObject.get(RuleConstants.STAT_DEXTERITY)));
    gameObject.set(RuleConstants.MOD_CONSTITUTION, calcStats(gameObject.get(RuleConstants.STAT_CONSTITUTION)));
    gameObject.set(RuleConstants.MOD_INTELLIGENCE, calcStats(gameObject.get(RuleConstants.STAT_INTELLIGENCE)));
    gameObject.set(RuleConstants.MOD_WISDOM, calcStats(gameObject.get(RuleConstants.STAT_WISDOM)));
    gameObject.set(RuleConstants.MOD_CHARISMA, calcStats(gameObject.get(RuleConstants.STAT_CHARISMA)));
};

export const attackBonusCalc = gameObject => {
    gameObject.set(RuleConstants.ATTACK_STR,
        gameObject.get(RuleConstants.BAB) +
        gameObject.get(RuleConstants.MOD_STRENGTH) +
        gameObject.get(RuleConstants.MODIFIER_ATTACK));
    gameObject.set(RuleConstants.ATTACK_DEX,
        gameObject.get(RuleConstants.BAB) +
        gameObject.get(RuleConstants.MOD_DEXTERITY) +
        gameObject.get(RuleConstants.MODIFIER_ATTACK));
    gameObject.set(RuleConstants.ATTACK_FLAT,
        gameObject.get(RuleConstants.BAB) +
        gameObject.get(RuleConstants.MODIFIER_ATTACK));
    gameObject.set(RuleConstants.INITIATIVE, gameObject.get(RuleConstants.MOD_DEXTERITY));
};

export const saveCalc = gameObject => {
    gameObject.set(RuleConstants.SAVE_FORTITUDE,
        gameObject.get(RuleConstants.MODIFIER_SAVE_FORTITUDE) +
        gameObject.get(RuleConstants.CLASS_SAVE_FORTITUDE) +
        gameObject.get(RuleConstants.MOD_CONSTITUTION));
    gameObject.set(RuleConstants.SAVE_REFLEX,
        gameObject.get(RuleConstants.MODIFIER_SAVE_REFLEX) +
        gameObject.get(RuleConstants.CLASS_SAVE_REFLEX) +
        gameObject.get(RuleConstants.MOD_DEXTERITY));
    gameObject.set(RuleConstants.SAVE_WILL,
        gameObject.get(RuleConstants.MODIFIER_SAVE_WILL) +
        gameObject.get(RuleConstants.CLASS_SAVE_WILL) +
        gameObject.get(RuleConstants.MOD_WISDOM));
};

export const combatManeuverCalc = gameObject => {
    gameObject.set(RuleConstants.COMBAT_MANEUVER_BONUS, gameObject.get(RuleConstants.BAB) +
        gameObject.get(RuleConstants.MOD_STRENGTH) +
        gameObject.get(RuleConstants.MODIFIER_CMB));
    gameObject.set(RuleConstants.COMBAT_MANEUVER_DEFENCE, 10 + gameObject.get(RuleConstants.BAB) +
        gameObject.get(RuleConstants.MOD_STRENGTH) +
        gameObject.get(RuleConstants.DODGE) +
        gameObject.get(RuleConstants.MODIFIER_DEFLECT) +
        gameObject.get(RuleConstants.MODIFIER_CMD));
};

export const skillCalc = gameObject => {
    const getSkillModifier = key => {
        if (RuleSkillsStatConstants.SKILLS_STR.includes(key)) return gameObject.get(RuleConstants.MOD_STRENGTH);
        if (RuleSkillsStatConstants.SKILLS_DEX.includes(key)) return gameObject.get(RuleConstants.MOD_DEXTERITY);
        if (RuleSkillsStatConstants.SKILLS_INT.includes(key)) return gameObject.get(RuleConstants.MOD_INTELLIGENCE);
        if (RuleSkillsStatConstants.SKILLS_WIS.includes(key)) return gameObject.get(RuleConstants.MOD_WISDOM);
        if (RuleSkillsStatConstants.SKILLS_CHA.includes(key)) return gameObject.get(RuleConstants.MOD_CHARISMA);
    };
    const processRanks = key => {
        const ranks = gameObject.get(key);
        if (gameObject.get(RuleSkillConstants.CLASS_SKILLS_ARRAY).includes(key) && ranks > 0) {
            return ranks + 2;
        } else {
            return ranks;
        }
    };

    gameObject.set(RuleSkillConstants.SKILL_ACROBATICS, processRanks(RuleSkillConstants.SKILL_ACROBATICS_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_ACROBATICS));
    gameObject.set(RuleSkillConstants.SKILL_APPRAISE, processRanks(RuleSkillConstants.SKILL_APPRAISE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_APPRAISE));
    gameObject.set(RuleSkillConstants.SKILL_BLUFF, processRanks(RuleSkillConstants.SKILL_BLUFF_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_BLUFF));
    gameObject.set(RuleSkillConstants.SKILL_CLIMB, processRanks(RuleSkillConstants.SKILL_CLIMB_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_CLIMB));
    gameObject.set(RuleSkillConstants.SKILL_CRAFT, processRanks(RuleSkillConstants.SKILL_CRAFT_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_CRAFT));
    gameObject.set(RuleSkillConstants.SKILL_DIPLOMACY, processRanks(RuleSkillConstants.SKILL_DIPLOMACY_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_DIPLOMACY));
    gameObject.set(RuleSkillConstants.SKILL_DISABLE_DEVICE, processRanks(RuleSkillConstants.SKILL_DISABLE_DEVICE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_DISABLE_DEVICE));
    gameObject.set(RuleSkillConstants.SKILL_DISGUISE, processRanks(RuleSkillConstants.SKILL_DISGUISE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_DISGUISE));
    gameObject.set(RuleSkillConstants.SKILL_ESCAPE_ARTIST, processRanks(RuleSkillConstants.SKILL_ESCAPE_ARTIST_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_ESCAPE_ARTIST));
    gameObject.set(RuleSkillConstants.SKILL_FLY, processRanks(RuleSkillConstants.SKILL_FLY_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_FLY));
    gameObject.set(RuleSkillConstants.SKILL_HANDLE_ANIMAL, processRanks(RuleSkillConstants.SKILL_HANDLE_ANIMAL_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_HANDLE_ANIMAL));
    gameObject.set(RuleSkillConstants.SKILL_HEAL, processRanks(RuleSkillConstants.SKILL_HEAL_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_HEAL));
    gameObject.set(RuleSkillConstants.SKILL_INTIMIDATE, processRanks(RuleSkillConstants.SKILL_INTIMIDATE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_INTIMIDATE));
    gameObject.set(RuleSkillConstants.SKILL_LINGUISTICS, processRanks(RuleSkillConstants.SKILL_LINGUISTICS_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_LINGUISTICS));
    gameObject.set(RuleSkillConstants.SKILL_PERCEPTION, processRanks(RuleSkillConstants.SKILL_PERCEPTION_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_PERCEPTION));
    gameObject.set(RuleSkillConstants.SKILL_PERFORM, processRanks(RuleSkillConstants.SKILL_PERFORM_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_PERFORM));
    gameObject.set(RuleSkillConstants.SKILL_PROFESSION, processRanks(RuleSkillConstants.SKILL_PROFESSION_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_PROFESSION));
    gameObject.set(RuleSkillConstants.SKILL_RIDE, processRanks(RuleSkillConstants.SKILL_RIDE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_RIDE));
    gameObject.set(RuleSkillConstants.SKILL_SENSE_MOTIVE, processRanks(RuleSkillConstants.SKILL_SENSE_MOTIVE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SENSE_MOTIVE));
    gameObject.set(RuleSkillConstants.SKILL_SLEIGHT_OF_HAND, processRanks(RuleSkillConstants.SKILL_SLEIGHT_OF_HAND_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SLEIGHT_OF_HAND));
    gameObject.set(RuleSkillConstants.SKILL_SPELLCRAFT, processRanks(RuleSkillConstants.SKILL_SPELLCRAFT_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SPELLCRAFT));
    gameObject.set(RuleSkillConstants.SKILL_STEALTH, processRanks(RuleSkillConstants.SKILL_STEALTH_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_STEALTH));
    gameObject.set(RuleSkillConstants.SKILL_SURVIVAL, processRanks(RuleSkillConstants.SKILL_SURVIVAL_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SURVIVAL));
    gameObject.set(RuleSkillConstants.SKILL_SWIM, processRanks(RuleSkillConstants.SKILL_SWIM_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SWIM));
    gameObject.set(RuleSkillConstants.SKILL_USE_MAGIC_DEVICE, processRanks(RuleSkillConstants.SKILL_USE_MAGIC_DEVICE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_USE_MAGIC_DEVICE));

    gameObject.set(RuleSkillConstants.SKILL_KNOWLEDGE_ARCANA, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_ARCANA_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_ARCANA));
    gameObject.set(RuleSkillConstants.SKILL_KNOWLEDGE_DUNGEONEERING, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_DUNGEONEERING_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_DUNGEONEERING));
    gameObject.set(RuleSkillConstants.SKILL_KNOWLEDGE_GEOGRAPHY, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_GEOGRAPHY_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_GEOGRAPHY));
    gameObject.set(RuleSkillConstants.SKILL_KNOWLEDGE_ENGINEERING, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_ENGINEERING_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_ENGINEERING));
    gameObject.set(RuleSkillConstants.SKILL_KNOWLEDGE_HISTORY, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_HISTORY_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_HISTORY));
    gameObject.set(RuleSkillConstants.SKILL_KNOWLEDGE_LOCAL, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_LOCAL_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_LOCAL));
    gameObject.set(RuleSkillConstants.SKILL_KNOWLEDGE_NOBILITY, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_NOBILITY_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_NOBILITY));
    gameObject.set(RuleSkillConstants.SKILL_KNOWLEDGE_NATURE, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_NATURE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_NATURE));
    gameObject.set(RuleSkillConstants.SKILL_KNOWLEDGE_PLANES, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_PLANES_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_PLANES));
    gameObject.set(RuleSkillConstants.SKILL_KNOWLEDGE_RELIGION, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_RELIGION_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_RELIGION));

    gameObject.set(RuleSkillConstants.SKILL_SCIENCE, processRanks(RuleSkillConstants.SKILL_SCIENCE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SCIENCE));
};