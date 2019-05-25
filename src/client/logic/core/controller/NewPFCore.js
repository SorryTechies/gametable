/**
 * Created by LastBerserk on 11.04.2019.
 */

import CoreController from "./CoreController";
import StatElement from "../stat/StatElement";
import StatModifierElement from "../stat/StatModifierElement";
import SkillElement from "../skill/SkillElement";
import AdditionalElement from "../AdditionalElement";
import ArmorComponent from "../armor/ArmorComponentElement";
import ArmorRatingsElement from "../armor/ArmorRatingsElement";
import BaseModifier from "../base/BaseModifier";
import * as PFCoreConstants from "../../../../common/PFCoreConstants";
import RuleCore from "./RuleCore";
import CoreCharacter from "./CoreCharacter";
import SkillProficiency from "../skill/SkillProficiency";
import SkillPoints from "../skill/SkillPoints";
import SaveElement from "../SaveElement";

function createStat(char, tag) {
    const stat = new StatElement(tag);
    stat.defaultValue = 10;
    char.addElement(stat);
    return stat;
}

function createStatModifier(char, tag) {
    const modifier = new StatModifierElement(tag);
    const stat = char.getDependency(StatElement.category, tag);
    if (!stat) throw Error(`Can't find stat with id '${tag}'.`);
    stat.dependents.push(modifier);
    modifier.calculate = () => modifier.result = modifier.defaultValue + Math.floor((stat.result - 10) / 2);
    char.addElement(modifier);
    return modifier;
}

function createStatAndModifier(char, tag) {
    createStat(char, tag);
    createStatModifier(char, tag);
}

function createSkills(char) {
    const armorPenalty = char.getDependency(AdditionalElement.category, PFCoreConstants.ADDITIONALS.ARMOR_PENALTY);
    if (!armorPenalty) throw Error(`Can't find additional with id ArmorPenalty.`);
    const createSkill = (tag, stat) => {
        const skill = new SkillElement(tag);
        const proficiency = new SkillProficiency(tag);
        char.addElement(proficiency);
        const points = new SkillPoints(tag);
        char.addElement(points);
        const statModifier = char.getDependency(StatModifierElement.category, stat);
        if (!statModifier) throw Error(`Can't find stat with id '${statModifier}'.`);
        statModifier.dependents.push(skill);
        char.addElement(skill);
        switch (tag) {
            case PFCoreConstants.SKILLS.ACROBATICS:
            case PFCoreConstants.SKILLS.CLIMB:
            case PFCoreConstants.SKILLS.DISGUISE:
            case PFCoreConstants.SKILLS.FLY:
            case PFCoreConstants.SKILLS.SLEIGHT_OF_HANDS:
            case PFCoreConstants.SKILLS.STEALTH:
            case PFCoreConstants.SKILLS.SWIM:
                skill.calculate = () => skill.result =
                    (proficiency.result > 0 && points.result > 0 ? points.result + 3: points.result) + skill.defaultValue + statModifier.result + armorPenalty.result;
                break;
            default:
                skill.calculate = () => skill.result =
                    (proficiency.result > 0 && points.result > 0 ? points.result + 3: points.result) + skill.defaultValue + statModifier.result;
        }
    };

    createSkill(PFCoreConstants.SKILLS.ACROBATICS, PFCoreConstants.STATS.DEX);
    createSkill(PFCoreConstants.SKILLS.APPRISE, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.CLIMB, PFCoreConstants.STATS.STR);
    createSkill(PFCoreConstants.SKILLS.DISGUISE, PFCoreConstants.STATS.CHA);
    createSkill(PFCoreConstants.SKILLS.DIPLOMACY, PFCoreConstants.STATS.CHA);
    createSkill(PFCoreConstants.SKILLS.INTIMIDATE, PFCoreConstants.STATS.CHA);

    createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_ARCANA, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_ALCHEMY, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_DUNGEONEERING, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_ENGINEERING, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_GEOGRAPHY, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_LOCAL, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_NATURE, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_RELIGION, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.KNOWLEDGE_PLANES, PFCoreConstants.STATS.INT);

    createSkill(PFCoreConstants.SKILLS.DISABLE_DEVICE, PFCoreConstants.STATS.DEX);
    createSkill(PFCoreConstants.SKILLS.LINGUISTICS, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.CRAFT, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.RIDE, PFCoreConstants.STATS.DEX);
    createSkill(PFCoreConstants.SKILLS.ESCAPE_ARTIST, PFCoreConstants.STATS.DEX);
    createSkill(PFCoreConstants.SKILLS.HEAL, PFCoreConstants.STATS.WIS);
    createSkill(PFCoreConstants.SKILLS.PERFORM, PFCoreConstants.STATS.CHA);
    createSkill(PFCoreConstants.SKILLS.BLUFF, PFCoreConstants.STATS.CHA);
    createSkill(PFCoreConstants.SKILLS.FLY, PFCoreConstants.STATS.DEX);
    createSkill(PFCoreConstants.SKILLS.SPELLCRAFT, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.SURVIVAL, PFCoreConstants.STATS.WIS);
    createSkill(PFCoreConstants.SKILLS.USE_MAGIC_DEVICE, PFCoreConstants.STATS.CHA);

    createSkill(PFCoreConstants.SKILLS.SENSE_MOTIVE, PFCoreConstants.STATS.WIS);
    createSkill(PFCoreConstants.SKILLS.PERCEPTION, PFCoreConstants.STATS.WIS);
    createSkill(PFCoreConstants.SKILLS.SLEIGHT_OF_HANDS, PFCoreConstants.STATS.DEX);
    createSkill(PFCoreConstants.SKILLS.STEALTH, PFCoreConstants.STATS.DEX);
    createSkill(PFCoreConstants.SKILLS.SWIM, PFCoreConstants.STATS.DEX);
}

function createArmorComponent(char) {
    const dexModifier = char.getDependency(StatModifierElement.category, PFCoreConstants.STATS.DEX);
    const size = char.getDependency(AdditionalElement.category, PFCoreConstants.ADDITIONALS.SIZE);
    const dodge = new ArmorComponent(PFCoreConstants.ARMOR_COMPONENTS.DODGE);
    dodge.calculate = () => dodge.result = dodge.defaultValue + dexModifier.result - size.result;
    char.addElement(dodge);
    char.addElement(new ArmorComponent(PFCoreConstants.ARMOR_COMPONENTS.DEFLECT));
    char.addElement(new ArmorComponent(PFCoreConstants.ARMOR_COMPONENTS.ARMOR));
}

function createAdditional(char) {
    const dexModifier = char.getDependency(StatModifierElement.category, PFCoreConstants.STATS.DEX);
    const strModifier = char.getDependency(StatModifierElement.category, PFCoreConstants.STATS.STR);
    const size = new AdditionalElement(PFCoreConstants.ADDITIONALS.SIZE);
    size.priority = 0;
    char.addElement(size);
    const armorPen = new AdditionalElement(PFCoreConstants.ADDITIONALS.ARMOR_PENALTY);
    armorPen.priority = 0;
    char.addElement(armorPen);
    const bab = new AdditionalElement(PFCoreConstants.ADDITIONALS.BASE_ATTACK_BONUS);
    bab.priority = 0;
    char.addElement(bab);
    const cmb = new AdditionalElement(PFCoreConstants.ADDITIONALS.COMBAT_MANEUVER_BONUS);
    cmb.priority = 2;
    char.addElement(cmb);
    cmb.calculate = () => cmb.result = cmb.defaultValue + bab.result + strModifier.result + size.result;
    const cmd = new AdditionalElement(PFCoreConstants.ADDITIONALS.COMBAT_MANEUVER_DEFENSE);
    cmd.priority = 2;
    cmd.defaultValue = 10;
    char.addElement(cmd);
    cmd.calculate = () => cmd.result = cmd.defaultValue + bab.result + strModifier.result + dexModifier.result + size.result;
    const init = new AdditionalElement(PFCoreConstants.ADDITIONALS.INITIATIVE);
    init.priority = 2;
    char.addElement(init);
    init.calculate = () => init.result = init.defaultValue + dexModifier.result;
}

function createArmorValues(char) {
    const dodge = char.getDependency(ArmorComponent.category, PFCoreConstants.ARMOR_COMPONENTS.DODGE);
    const deflect = char.getDependency(ArmorComponent.category, PFCoreConstants.ARMOR_COMPONENTS.DEFLECT);
    const armor = char.getDependency(ArmorComponent.category, PFCoreConstants.ARMOR_COMPONENTS.ARMOR);

    const full = new ArmorRatingsElement(PFCoreConstants.ARMOR_RATING.FULL);
    full.defaultValue = 10;
    full.calculate = () => full.result = full.defaultValue + dodge.result + deflect.result + armor.result;
    full.priority = 9;
    char.addElement(full);

    const ff = new ArmorRatingsElement(PFCoreConstants.ARMOR_RATING.FLAT_FOOTED);
    ff.defaultValue = 10;
    ff.calculate = () => {
        const result = ff.defaultValue + deflect.result + armor.result;
        if (full.result > result) {
            ff.result = result;
        } else {
            ff.result = full.result;
        }
    };
    char.addElement(ff);

    const to = new ArmorRatingsElement(PFCoreConstants.ARMOR_RATING.TOUCH);
    to.defaultValue = 10;
    to.calculate = () => {
        const result = to.defaultValue + dodge.result + deflect.result;
        if (full.result > result) {
            to.result = result;
        } else {
            to.result = full.result;
        }
    };
    char.addElement(to);

    const ffto = new ArmorRatingsElement(PFCoreConstants.ARMOR_RATING.FLAT_TOUCH);
    ffto.defaultValue = 10;
    ffto.calculate = () => {
        const result = ffto.result = ffto.defaultValue + deflect.result;
        if (full.result > result) {
            ffto.result = result;
        } else {
            ffto.result = full.result;
        }
    };
    char.addElement(ffto);
}

function createStats(char) {
    createStatAndModifier(char, PFCoreConstants.STATS.STR);
    createStatAndModifier(char, PFCoreConstants.STATS.DEX);
    createStatAndModifier(char, PFCoreConstants.STATS.CON);
    createStatAndModifier(char, PFCoreConstants.STATS.INT);
    createStatAndModifier(char, PFCoreConstants.STATS.WIS);
    createStatAndModifier(char, PFCoreConstants.STATS.CHA);
}

function createSaves(char) {
    const con = char.getDependency(StatModifierElement.category, PFCoreConstants.STATS.CON);
    const dex = char.getDependency(StatModifierElement.category, PFCoreConstants.STATS.DEX);
    const wis = char.getDependency(StatModifierElement.category, PFCoreConstants.STATS.WIS);
    const fort = new SaveElement(PFCoreConstants.SAVES.FORTITUDE);
    fort.calculate = () => fort.result = fort.defaultValue + con.result;
    const refl = new SaveElement(PFCoreConstants.SAVES.REFLEX);
    refl.calculate = () => refl.result = refl.defaultValue + dex.result;
    const will = new SaveElement(PFCoreConstants.SAVES.WILL);
    will.calculate = () => will.result = will.defaultValue + wis.result;
    char.addElement(fort);
    char.addElement(refl);
    char.addElement(will);
}

export default class PFRuleCore extends RuleCore {
    static createCharacter() {
        const character = new CoreCharacter();
        createStats(character);
        character.setPriorityForCategory(StatElement.category, 0);
        character.setPriorityForCategory(StatModifierElement.category, 1);
        createAdditional(character);
        createSkills(character);
        character.setPriorityForCategory(SkillProficiency.category, 3);
        character.setPriorityForCategory(SkillPoints.category, 3);
        character.setPriorityForCategory(SkillElement.category, 4);
        createArmorComponent(character);
        character.setPriorityForCategory(ArmorComponent.category, 3);
        createArmorValues(character);
        createSaves(character);
        character.setPriorityForCategory(SaveElement.category, 9);
        return character;
    }

    /** @param {CharacterCoreT} data */
    static setCore(data) {
        if (!data) return;
        const core = CoreController.getDependency(data.category, data.tag);
        if (!core) return;
        core.defaultValue = data.value;
    }

    /** @param {CharacterModifierT} data */
    static addModifier(data) {
        if (!data) return;
        const core = CoreController.getDependency(data.category, data.tag);
        if (!core) return;
        const modifier = new BaseModifier(id, core);
        modifier.value = data.value;
    }
}


/**
 * @param {Character} characterData
 */
PFRuleCore.processCharacter = characterData => {
    let core = characterData.core;
    let modifiers = characterData.modifiers;
    if (!core) core = [];
    if (!modifiers) modifiers = [];
    core.forEach(coreValue => PFRuleCore.setCore(coreValue));
    modifiers.forEach(modifier => PFRuleCore.addModifier(modifier));
};

PFRuleCore.recalculate = () => {
    CoreController.recalculateAll();
};

