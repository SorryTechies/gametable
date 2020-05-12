/**
 * Created by LastBerserk on 17.01.2020.
 */

import CONST from "../constants/RuleStatConstants";
import SKILL_CONST from "../constants/RuleSkillsStatConstants";
import SKILLS from "../constants/RuleSkillConstants";
import FEATS from "../constants/RuleFeatsConstants";
import * as SKILL_SUP from "../constants/RuleSkillSupportConst";
import LOADOUT from "../constants/RuleLoadType";
import * as RuleWeightTable from "../table/RuleWeightTable";
import BUFFS from "../constants/RuleBuffConstants";

export const dodgeCalc = cha => cha.set(CONST.DODGE, cha.get(CONST.MODIFIER_DODGE) +
    cha.get(CONST.MOD_DEXTERITY));

/**
 * AC calculation.
 * @param {RuleGameObject} gm
 */
export const defenceCalc = gm => {
    const tffac = 10 + gm.get(CONST.MODIFIER_DEFLECT) - gm.get(CONST.SIZE) + gm.get(CONST.ARMOR_CLASS);
    const ARMOR = gm.get(CONST.MODIFIER_ARMOR) + gm.get(CONST.MODIFIER_SHIELD);
    const DODGE = gm.get(CONST.DODGE);
    const ac = tffac + ARMOR + DODGE;
    const setIfLesser = val => ac > val ? val : ac;
    const tac = tffac + DODGE;
    const ffac = tffac + ARMOR;

    if (gm.hasBuff(BUFFS.BLINDED)) {
        gm.set(CONST.DEFENCE_AC, ffac);
        gm.set(CONST.DEFENCE_TOUCH_AC, tffac);
    } else {
        gm.set(CONST.DEFENCE_AC, ac);
        gm.set(CONST.DEFENCE_TOUCH_AC, setIfLesser(tac));
    }
    gm.set(CONST.DEFENCE_FLAT_FOOTED_AC, setIfLesser(ffac));
    gm.set(CONST.DEFENCE_TFF_AC, setIfLesser(tffac));
};

/**
 * Stat modificators calculation.
 * @param {RuleGameObject} gm
 */
export const statCalc = gm => {
    const calcStats = (val) => {
        const mod = (val - 10) / 2;
        return mod < 0 ? Math.floor(mod) : Math.floor(mod);
    };
    const size = gm.get(CONST.SIZE);
    const str = (gm.get(CONST.STAT_STRENGTH) + 2) * size;
    const dex = (gm.get(CONST.STAT_STRENGTH) - 2) * size;

    gm.set(CONST.MOD_STRENGTH, calcStats(gm.get(CONST.STAT_STRENGTH) + str));
    gm.set(CONST.MOD_DEXTERITY, calcStats(gm.get(CONST.STAT_DEXTERITY) + dex));
    gm.set(CONST.MOD_CONSTITUTION, calcStats(gm.get(CONST.STAT_CONSTITUTION)));
    gm.set(CONST.MOD_INTELLIGENCE, calcStats(gm.get(CONST.STAT_INTELLIGENCE)));
    gm.set(CONST.MOD_WISDOM, calcStats(gm.get(CONST.STAT_WISDOM)));
    gm.set(CONST.MOD_CHARISMA, calcStats(gm.get(CONST.STAT_CHARISMA)));
};

export const healthCalc = gm => {
    gm.set(CONST.HEALTH_DIE_PER_LEVEL, gm.get(CONST.MOD_CONSTITUTION));
    let addHP = 0;
    const lvl = gm.get(CONST.LEVEL);
    if (gm.ruleCharacter.hasFeat(FEATS.TOUGHNESS)) addHP += lvl > 3 ? lvl : 3;
    gm.set(CONST.MAX_HEALTH, addHP + gm.get(CONST.HEALTH_DIE) + ((gm.get(CONST.HEALTH_DIE_PER_LEVEL - 1) * lvl)));
};

export const attackBonusCalc = gm => {
    gm.set(CONST.AMOUNT_OF_ATTACKS, Math.floor(gm.get(CONST.BAB) / 5) + 1);
    gm.set(CONST.ATTACK_FLAT,
        gm.get(CONST.BAB) +
        gm.get(CONST.MODIFIER_ATTACK) -
        gm.get(CONST.SIZE));
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
        if (SKILL_CONST.SKILLS_STR.includes(key)) return gm.get(CONST.MOD_STRENGTH) - gm.get(CONST.ARMOR_PENALTY);
        if (SKILL_CONST.SKILLS_DEX.includes(key)) return gm.get(CONST.MOD_DEXTERITY) - gm.get(CONST.ARMOR_PENALTY);
        if (SKILL_CONST.SKILLS_INT.includes(key)) return gm.get(CONST.MOD_INTELLIGENCE);
        if (SKILL_CONST.SKILLS_WIS.includes(key)) return gm.get(CONST.MOD_WISDOM);
        if (SKILL_CONST.SKILLS_CHA.includes(key)) return gm.get(CONST.MOD_CHARISMA);
    };
    const processRanks = key => {
        const ranks = gm.get(SKILL_SUP.getRankKey(key));
        if (gm.get(CONST.CLASS_SKILLS_ARRAY).includes(key) && ranks > 0) {
            return ranks + 2;
        } else {
            return ranks;
        }
    };

    Object.values(SKILLS).forEach(key => gm.set(key, processRanks(key) + getSkillModifier(key)));
};

export function calculateWeight(gm) {
    const weight = gm.items.items.reduce((acc, item) => acc + (typeof item.weight === "number" ? item.weight : 0), 0);
    const load = RuleWeightTable.getLoad(weight, gm.get(CONST.STAT_STRENGTH));
    const size = gm.get(CONST.SIZE);
    let sizeMod;
    if (size > 0) {
        sizeMod = size * 8;
    } else {
        if (size < 0) {
            sizeMod = 1 / (size * 8);
        } else {
            sizeMod = 1;
        }
    }
    gm.set(CONST.LOAD, load * sizeMod);
}
