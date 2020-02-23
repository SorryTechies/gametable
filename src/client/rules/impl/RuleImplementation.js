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
 * @param character
 */
export const defenceCalc = character => {
    const ac = 10 +
        character.get(RuleConstants.MODIFIER_ARMOR) +
        character.get(RuleConstants.DODGE) +
        character.get(RuleConstants.MODIFIER_DEFLECT);
    const setIfLesser = val => ac > val ? val : ac;
    const tac = 10 +
        character.get(RuleConstants.DODGE) +
        character.get(RuleConstants.MODIFIER_DEFLECT);
    const ffac = 10 +
        character.get(RuleConstants.MODIFIER_ARMOR) +
        character.get(RuleConstants.MODIFIER_DEFLECT);
    const tffac = 10 + character.get(RuleConstants.MODIFIER_DEFLECT);

    character.set(RuleConstants.DEFENCE_AC, ac);
    character.set(RuleConstants.DEFENCE_TOUCH_AC, setIfLesser(tac));
    character.set(RuleConstants.DEFENCE_TOUCH_FLAT_FOOTED_AC, setIfLesser(ffac));
    character.set(RuleConstants.DEFENCE_TFF_AC, setIfLesser(tffac));
};

/**
 * Stat modificators calculation.
 * @param character
 */
export const statCalc = character => {
    const calcStats = (val) => {
        const mod = (val - 10) / 2;
        return mod < 0 ? Math.floor(mod) : Math.floor(mod);
    };
    character.set(RuleConstants.MOD_STRENGTH, calcStats(character.get(RuleConstants.STAT_STRENGTH)));
    character.set(RuleConstants.MOD_DEXTERITY, calcStats(character.get(RuleConstants.STAT_DEXTERITY)));
    character.set(RuleConstants.MOD_CONSTITUTION, calcStats(character.get(RuleConstants.STAT_CONSTITUTION)));
    character.set(RuleConstants.MOD_INTELLIGENCE, calcStats(character.get(RuleConstants.STAT_INTELLIGENCE)));
    character.set(RuleConstants.MOD_WISDOM, calcStats(character.get(RuleConstants.STAT_WISDOM)));
    character.set(RuleConstants.MOD_CHARISMA, calcStats(character.get(RuleConstants.STAT_CHARISMA)));
};

export const attackBonusCalc = character => {
    character.set(RuleConstants.ATTACK_STR,
        character.get(RuleConstants.BAB) +
        character.get(RuleConstants.MOD_STRENGTH) +
        character.get(RuleConstants.MODIFIER_ATTACK));
    character.set(RuleConstants.ATTACK_DEX,
        character.get(RuleConstants.BAB) +
        character.get(RuleConstants.MOD_DEXTERITY) +
        character.get(RuleConstants.MODIFIER_ATTACK));
    character.set(RuleConstants.ATTACK_FLAT,
        character.get(RuleConstants.BAB) +
        character.get(RuleConstants.MODIFIER_ATTACK));
    character.set(RuleConstants.INITIATIVE, character.get(RuleConstants.MOD_DEXTERITY));
};

export const saveCalc = character => {
    character.set(RuleConstants.SAVE_FORTITUDE,
        character.get(RuleConstants.MODIFIER_SAVE_FORTITUDE) +
        character.get(RuleConstants.CLASS_SAVE_FORTITUDE) +
        character.get(RuleConstants.MOD_CONSTITUTION));
    character.set(RuleConstants.SAVE_REFLEX,
        character.get(RuleConstants.MODIFIER_SAVE_REFLEX) +
        character.get(RuleConstants.CLASS_SAVE_REFLEX) +
        character.get(RuleConstants.MOD_DEXTERITY));
    character.set(RuleConstants.SAVE_WILL,
        character.get(RuleConstants.MODIFIER_SAVE_WILL) +
        character.get(RuleConstants.CLASS_SAVE_WILL) +
        character.get(RuleConstants.MOD_WISDOM));
};

export const healthCalc = cha => {
    const hpPerLevel = cha.get(RuleConstants.HEALTH_DIE_PER_LEVEL) +
        cha.get(RuleConstants.MOD_CONSTITUTION) +
        cha.get(RuleConstants.MODIFIER_HEALTH_PER_LEVEL);
    const hpInitial = cha.get(RuleConstants.MOD_CONSTITUTION) +
        cha.get(RuleConstants.HEALTH_DIE) +
        cha.get(RuleConstants.MODIFIER_HEALTH_FLAT);
    cha.set(RuleConstants.MAX_HEALTH, hpPerLevel * (cha.get(RuleConstants.LEVEL) - 1) + hpInitial);
    cha.set(RuleConstants.HEALTH, cha.get(RuleConstants.MAX_HEALTH) +
        cha.get(RuleConstants.SHIELD) -
        cha.get(RuleConstants.LETHAL_DAMAGE) -
        cha.get(RuleConstants.NONLETHAL_DAMAGE));
};

export const combatManeuverCalc = cha => {
    cha.set(RuleConstants.COMBAT_MANEUVER_BONUS, cha.get(RuleConstants.BAB) +
        cha.get(RuleConstants.MOD_STRENGTH) +
        cha.get(RuleConstants.MODIFIER_CMB));
    cha.set(RuleConstants.COMBAT_MANEUVER_DEFENCE, 10 + cha.get(RuleConstants.BAB) +
        cha.get(RuleConstants.MOD_STRENGTH) +
        cha.get(RuleConstants.DODGE) +
        cha.get(RuleConstants.MODIFIER_DEFLECT) +
        cha.get(RuleConstants.MODIFIER_CMD));
};

export const skillCalc = cha => {
    const getSkillModifier = key => {
        if (RuleSkillsStatConstants.SKILLS_STR.includes(key)) return cha.get(RuleConstants.MOD_STRENGTH);
        if (RuleSkillsStatConstants.SKILLS_DEX.includes(key)) return cha.get(RuleConstants.MOD_DEXTERITY);
        if (RuleSkillsStatConstants.SKILLS_INT.includes(key)) return cha.get(RuleConstants.MOD_INTELLIGENCE);
        if (RuleSkillsStatConstants.SKILLS_WIS.includes(key)) return cha.get(RuleConstants.MOD_WISDOM);
        if (RuleSkillsStatConstants.SKILLS_CHA.includes(key)) return cha.get(RuleConstants.MOD_CHARISMA);
    };
    const processRanks = key => {
        const ranks = cha.get(key);
        if (cha.get(RuleSkillConstants.CLASS_SKILLS_ARRAY).includes(key) && ranks > 0) {
            return ranks + 2;
        } else {
            return ranks;
        }
    };

    cha.set(RuleSkillConstants.SKILL_ACROBATICS, processRanks(RuleSkillConstants.SKILL_ACROBATICS_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_ACROBATICS));
    cha.set(RuleSkillConstants.SKILL_APPRAISE, processRanks(RuleSkillConstants.SKILL_APPRAISE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_APPRAISE));
    cha.set(RuleSkillConstants.SKILL_BLUFF, processRanks(RuleSkillConstants.SKILL_BLUFF_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_BLUFF));
    cha.set(RuleSkillConstants.SKILL_CLIMB, processRanks(RuleSkillConstants.SKILL_CLIMB_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_CLIMB));
    cha.set(RuleSkillConstants.SKILL_CRAFT, processRanks(RuleSkillConstants.SKILL_CRAFT_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_CRAFT));
    cha.set(RuleSkillConstants.SKILL_DIPLOMACY, processRanks(RuleSkillConstants.SKILL_DIPLOMACY_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_DIPLOMACY));
    cha.set(RuleSkillConstants.SKILL_DISABLE_DEVICE, processRanks(RuleSkillConstants.SKILL_DISABLE_DEVICE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_DISABLE_DEVICE));
    cha.set(RuleSkillConstants.SKILL_DISGUISE, processRanks(RuleSkillConstants.SKILL_DISGUISE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_DISGUISE));
    cha.set(RuleSkillConstants.SKILL_ESCAPE_ARTIST, processRanks(RuleSkillConstants.SKILL_ESCAPE_ARTIST_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_ESCAPE_ARTIST));
    cha.set(RuleSkillConstants.SKILL_FLY, processRanks(RuleSkillConstants.SKILL_FLY_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_FLY));
    cha.set(RuleSkillConstants.SKILL_HANDLE_ANIMAL, processRanks(RuleSkillConstants.SKILL_HANDLE_ANIMAL_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_HANDLE_ANIMAL));
    cha.set(RuleSkillConstants.SKILL_HEAL, processRanks(RuleSkillConstants.SKILL_HEAL_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_HEAL));
    cha.set(RuleSkillConstants.SKILL_INTIMIDATE, processRanks(RuleSkillConstants.SKILL_INTIMIDATE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_INTIMIDATE));
    cha.set(RuleSkillConstants.SKILL_LINGUISTICS, processRanks(RuleSkillConstants.SKILL_LINGUISTICS_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_LINGUISTICS));
    cha.set(RuleSkillConstants.SKILL_PERCEPTION, processRanks(RuleSkillConstants.SKILL_PERCEPTION_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_PERCEPTION));
    cha.set(RuleSkillConstants.SKILL_PERFORM, processRanks(RuleSkillConstants.SKILL_PERFORM_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_PERFORM));
    cha.set(RuleSkillConstants.SKILL_PROFESSION, processRanks(RuleSkillConstants.SKILL_PROFESSION_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_PROFESSION));
    cha.set(RuleSkillConstants.SKILL_RIDE, processRanks(RuleSkillConstants.SKILL_RIDE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_RIDE));
    cha.set(RuleSkillConstants.SKILL_SENSE_MOTIVE, processRanks(RuleSkillConstants.SKILL_SENSE_MOTIVE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SENSE_MOTIVE));
    cha.set(RuleSkillConstants.SKILL_SLEIGHT_OF_HAND, processRanks(RuleSkillConstants.SKILL_SLEIGHT_OF_HAND_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SLEIGHT_OF_HAND));
    cha.set(RuleSkillConstants.SKILL_SPELLCRAFT, processRanks(RuleSkillConstants.SKILL_SPELLCRAFT_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SPELLCRAFT));
    cha.set(RuleSkillConstants.SKILL_STEALTH, processRanks(RuleSkillConstants.SKILL_STEALTH_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_STEALTH));
    cha.set(RuleSkillConstants.SKILL_SURVIVAL, processRanks(RuleSkillConstants.SKILL_SURVIVAL_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SURVIVAL));
    cha.set(RuleSkillConstants.SKILL_SWIM, processRanks(RuleSkillConstants.SKILL_SWIM_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SWIM));
    cha.set(RuleSkillConstants.SKILL_USE_MAGIC_DEVICE, processRanks(RuleSkillConstants.SKILL_USE_MAGIC_DEVICE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_USE_MAGIC_DEVICE));

    cha.set(RuleSkillConstants.SKILL_KNOWLEDGE_ARCANA, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_ARCANA_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_ARCANA));
    cha.set(RuleSkillConstants.SKILL_KNOWLEDGE_DUNGEONEERING, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_DUNGEONEERING_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_DUNGEONEERING));
    cha.set(RuleSkillConstants.SKILL_KNOWLEDGE_GEOGRAPHY, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_GEOGRAPHY_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_GEOGRAPHY));
    cha.set(RuleSkillConstants.SKILL_KNOWLEDGE_ENGINEERING, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_ENGINEERING_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_ENGINEERING));
    cha.set(RuleSkillConstants.SKILL_KNOWLEDGE_HISTORY, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_HISTORY_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_HISTORY));
    cha.set(RuleSkillConstants.SKILL_KNOWLEDGE_LOCAL, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_LOCAL_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_LOCAL));
    cha.set(RuleSkillConstants.SKILL_KNOWLEDGE_NOBILITY, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_NOBILITY_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_NOBILITY));
    cha.set(RuleSkillConstants.SKILL_KNOWLEDGE_NATURE, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_NATURE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_NATURE));
    cha.set(RuleSkillConstants.SKILL_KNOWLEDGE_PLANES, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_PLANES_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_PLANES));
    cha.set(RuleSkillConstants.SKILL_KNOWLEDGE_RELIGION, processRanks(RuleSkillConstants.SKILL_KNOWLEDGE_RELIGION_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_KNOWLEDGE_RELIGION));

    cha.set(RuleSkillConstants.SKILL_SCIENCE, processRanks(RuleSkillConstants.SKILL_SCIENCE_RANKS) + getSkillModifier(RuleSkillConstants.SKILL_SCIENCE));
};