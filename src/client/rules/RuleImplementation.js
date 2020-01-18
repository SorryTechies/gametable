/**
 * Created by LastBerserk on 17.01.2020.
 */


import RuleConstants from "./RuleConstants";

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