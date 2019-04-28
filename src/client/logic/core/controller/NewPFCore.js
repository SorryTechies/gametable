/**
 * Created by LastBerserk on 11.04.2019.
 */

import CoreController from "./CoreController";
import StatElement from "../StatElement";
import StatModifierElement from "../StatModifierElement";
import SkillElement from "../SkillElement";
import AdditionalElement from "../AdditionalElement";
import ArmorComponent from "../ArmorComponentElement";
import ArmorRatingsElement from "../ArmorRatingsElement";
import BaseModifier from "../base/BaseModifier";
import * as PFCoreConstants from "../../../../common/PFCoreConstants";
import RuleCore from "./RuleCore";
import CoreCharacter from "./CoreCharacter";

function createStat(tag) {
    const stat = new StatElement(tag);
    stat.defaultValue = 10;
}

function createStatModifier(tag) {
    return new StatModifierElement(tag);
}

function createStatAndModifier(tag) {
    createStat(tag);
    createStatModifier(tag);
}

function createSkills() {
    const armorPenalty = CoreController.getDependency(AdditionalElement.CLASS_ID, PFCoreConstants.ADDITIONALS.ARMOR_PENALTY);
    if (!armorPenalty) throw Error(`Can't find additional with id ArmorPenalty.`);
    const createSkill = (tag, stat) => {
        const skill = new SkillElement(tag, stat);
        const statModifier = CoreController.getDependency(StatModifierElement.CLASS_ID, stat);
        if (!statModifier) throw Error(`Can't find stat with id '${statModifier}'.`);
        statModifier.dependents.push(skill);
        switch (stat) {
            case PFCoreConstants.SKILLS.ACROBATICS:
            case PFCoreConstants.SKILLS.CLIMB:
            case PFCoreConstants.SKILLS.DISGUISE:
            case PFCoreConstants.SKILLS.SLEIGHT_OF_HANDS:
                skill.calculate = () => skill.result = statModifier.result + armorPenalty.result;
                break;
            default:
                skill.calculate = () => skill.result = statModifier.result;
        }
    };

    createSkill(PFCoreConstants.SKILLS.ACROBATICS, PFCoreConstants.STATS.DEX);
    createSkill(PFCoreConstants.SKILLS.APPRISE, PFCoreConstants.STATS.INT);
    createSkill(PFCoreConstants.SKILLS.CLIMB, PFCoreConstants.STATS.STR);
    createSkill(PFCoreConstants.SKILLS.DISGUISE, PFCoreConstants.STATS.WIS);
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

    createSkill(PFCoreConstants.SKILLS.PERCEPTION, PFCoreConstants.STATS.WIS);
    createSkill(PFCoreConstants.SKILLS.SLEIGHT_OF_HANDS, PFCoreConstants.STATS.DEX);
    createSkill(PFCoreConstants.SKILLS.STEALTH, PFCoreConstants.STATS.DEX);
    createSkill(PFCoreConstants.SKILLS.SWIM, PFCoreConstants.STATS.DEX);
}

function createArmorComponent() {
    const dexModifier = CoreController.getDependency(StatModifierElement.CLASS_ID, PFCoreConstants.STATS.DEX);
    const size = CoreController.getDependency(AdditionalElement.CLASS_ID, PFCoreConstants.ADDITIONALS.SIZE);
    const dodge = new ArmorComponent(PFCoreConstants.ARMOR_COMPONENTS.DODGE);
    dodge.calculate = () => dodge.result = dexModifier.result - size.result;
    new ArmorComponent(PFCoreConstants.ARMOR_COMPONENTS.DEFLECT);
    new ArmorComponent(PFCoreConstants.ARMOR_COMPONENTS.ARMOR);
}

function createAdditional() {
    const dexModifier = CoreController.getDependency(StatModifierElement.CLASS_ID, PFCoreConstants.STATS.DEX);
    const strModifier = CoreController.getDependency(StatModifierElement.CLASS_ID, PFCoreConstants.STATS.STR);
    const size = new AdditionalElement(PFCoreConstants.ADDITIONALS.SIZE);
    size.priority = 0;
    const armorPen = new AdditionalElement(PFCoreConstants.ADDITIONALS.ARMOR_PENALTY);
    armorPen.priority = 0;
    const bab = new AdditionalElement(PFCoreConstants.ADDITIONALS.BASE_ATTACK_BONUS);
    bab.priority = 0;
    const cmb = new AdditionalElement(PFCoreConstants.ADDITIONALS.COMBAT_MANEUVER_BONUS);
    cmb.priority = 2;
    cmb.calculate = () => cmb.result = bab.result + strModifier.result + size.result;
    const cmd = new AdditionalElement(PFCoreConstants.ADDITIONALS.COMBAT_MANEUVER_DEFENSE);
    cmd.priority = 2;
    cmd.calculate = () => cmb.result = bab.result + strModifier.result + dexModifier.result + size.result;
}

function createArmorValues() {
    const dodge = CoreController.getDependency(ArmorComponent.CLASS_ID, PFCoreConstants.ARMOR_COMPONENTS.DODGE);
    const deflect = CoreController.getDependency(ArmorComponent.CLASS_ID, PFCoreConstants.ARMOR_COMPONENTS.DEFLECT);
    const armor = CoreController.getDependency(ArmorComponent.CLASS_ID, PFCoreConstants.ARMOR_COMPONENTS.ARMOR);
    const full = new ArmorRatingsElement(PFCoreConstants.ARMOR_RATING.FULL);
    full.defaultValue = 10;
    full.calculate = () => full.result = full.defaultValue + dodge.result + deflect.result + armor.result;
    full.priority = 9;

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

    const ffto = new ArmorRatingsElement(PFCoreConstants.ARMOR_RATING.FLAT_TOUCH);
    ffto.defaultValue = 10;
    ffto.calculate = () => {
        const result = full.result = full.defaultValue + deflect.result;
        if (full.result > result) {
            ffto.result = result;
        } else {
            ffto.result = full.result;
        }
    };
}

function createStats() {
    createStatAndModifier(PFCoreConstants.STATS.STR);
    createStatAndModifier(PFCoreConstants.STATS.DEX);
    createStatAndModifier(PFCoreConstants.STATS.CON);
    createStatAndModifier(PFCoreConstants.STATS.INT);
    createStatAndModifier(PFCoreConstants.STATS.WIS);
    createStatAndModifier(PFCoreConstants.STATS.CHA);
}

export default class PFRuleCore extends RuleCore {
    static createCharacter() {
        const character = new CoreCharacter();
        createStats();
        character.setPriorityForCategory(StatElement.CLASS_ID, 0);
        character.setPriorityForCategory(StatModifierElement.CLASS_ID, 1);
        createAdditional();
        createSkills();
        character.setPriorityForCategory(SkillElement.CLASS_ID, 3);
        createArmorComponent();
        character.setPriorityForCategory(ArmorComponent.CLASS_ID, 3);
        createArmorValues();
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

