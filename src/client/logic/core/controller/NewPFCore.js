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
    const armorPenalty = CoreController.getDependency(AdditionalElement.CLASS_ID, NewPFCore.ADDITIONALS.ARMOR_PENALTY);
    if (!armorPenalty) throw Error(`Can't find additional with id ArmorPenalty.`);
    const createSkill = (tag, stat) => {
        const skill =  new SkillElement(tag, stat);
        const statModifier = CoreController.getDependency(StatModifierElement.CLASS_ID, stat);
        if (!statModifier) throw Error(`Can't find stat with id '${statModifier}'.`);
        statModifier.dependents.push(skill);
        switch (stat) {
            case NewPFCore.SKILLS.ACROBATICS:
            case NewPFCore.SKILLS.CLIMB:
            case NewPFCore.SKILLS.DISGUISE:
            case NewPFCore.SKILLS.SLEIGHT_OF_HANDS:
                skill.calculate = () => skill.result = statModifier.result + armorPenalty.result;
                break;
            default:
                skill.calculate = () => skill.result = statModifier.result;
        }
    };

    createSkill(NewPFCore.SKILLS.ACROBATICS, NewPFCore.STATS.DEX);
    createSkill(NewPFCore.SKILLS.APPRISE, NewPFCore.STATS.INT);
    createSkill(NewPFCore.SKILLS.CLIMB, NewPFCore.STATS.STR);
    createSkill(NewPFCore.SKILLS.DISGUISE, NewPFCore.STATS.WIS);
    createSkill(NewPFCore.SKILLS.DIPLOMACY, NewPFCore.STATS.CHA);
    createSkill(NewPFCore.SKILLS.INTIMIDATE, NewPFCore.STATS.CHA);

    createSkill(NewPFCore.SKILLS.KNOWLEDGE_ARCANA, NewPFCore.STATS.INT);
    createSkill(NewPFCore.SKILLS.KNOWLEDGE_ALCHEMY, NewPFCore.STATS.INT);
    createSkill(NewPFCore.SKILLS.KNOWLEDGE_DUNGEONEERING, NewPFCore.STATS.INT);
    createSkill(NewPFCore.SKILLS.KNOWLEDGE_ENGINEERING, NewPFCore.STATS.INT);
    createSkill(NewPFCore.SKILLS.KNOWLEDGE_GEOGRAPHY, NewPFCore.STATS.INT);
    createSkill(NewPFCore.SKILLS.KNOWLEDGE_LOCAL, NewPFCore.STATS.INT);
    createSkill(NewPFCore.SKILLS.KNOWLEDGE_NATURE, NewPFCore.STATS.INT);
    createSkill(NewPFCore.SKILLS.KNOWLEDGE_RELIGION, NewPFCore.STATS.INT);
    createSkill(NewPFCore.SKILLS.KNOWLEDGE_PLANES, NewPFCore.STATS.INT);

    createSkill(NewPFCore.SKILLS.PERCEPTION, NewPFCore.STATS.WIS);
    createSkill(NewPFCore.SKILLS.SLEIGHT_OF_HANDS, NewPFCore.STATS.DEX);
    createSkill(NewPFCore.SKILLS.STEALTH, NewPFCore.STATS.DEX);
    createSkill(NewPFCore.SKILLS.SWIM, NewPFCore.STATS.DEX);
}

function createArmorComponent() {
    const dexModifier = CoreController.getDependency(StatModifierElement.CLASS_ID, NewPFCore.STATS.DEX);
    const dodge = new ArmorComponent(NewPFCore.ARMOR_COMPONENTS.DODGE);
    dodge.calculate = () => dodge.result = dexModifier.result;
    new ArmorComponent(NewPFCore.ARMOR_COMPONENTS.DEFLECT);
    new ArmorComponent(NewPFCore.ARMOR_COMPONENTS.ARMOR);
    new ArmorComponent(NewPFCore.ARMOR_COMPONENTS.SIZE);
}

function createAdditional() {
    new AdditionalElement(NewPFCore.ADDITIONALS.ARMOR_PENALTY);
}

function createArmorValues() {
    const dodge = CoreController.getDependency(ArmorComponent.CLASS_ID, NewPFCore.ARMOR_COMPONENTS.DODGE);
    const deflect = CoreController.getDependency(ArmorComponent.CLASS_ID, NewPFCore.ARMOR_COMPONENTS.DEFLECT);
    const armor = CoreController.getDependency(ArmorComponent.CLASS_ID, NewPFCore.ARMOR_COMPONENTS.ARMOR);
    const full = new ArmorRatingsElement(NewPFCore.ARMOR_RATING.FULL);
    full.defaultValue = 10;
    full.calculate = () => full.result = full.defaultValue + dodge.result + deflect.result + armor.result;
    full.priority = 9;

    const ff = new ArmorRatingsElement(NewPFCore.ARMOR_RATING.FLAT_FOOTED);
    ff.defaultValue = 10;
    ff.calculate = () => {
        const result = ff.defaultValue + deflect.result + armor.result;
        if (full.result > result) {
            ff.result = result;
        } else {
            ff.result = full.result;
        }
    };

    const to = new ArmorRatingsElement(NewPFCore.ARMOR_RATING.TOUCH);
    to.defaultValue = 10;
    to.calculate = () => {
        const result = to.defaultValue + dodge.result + deflect.result;
        if (full.result > result) {
            to.result = result;
        } else {
            to.result = full.result;
        }
    };

    const ffto = new ArmorRatingsElement(NewPFCore.ARMOR_RATING.FLAT_TOUCH);
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
    createStatAndModifier(NewPFCore.STATS.STR);
    createStatAndModifier(NewPFCore.STATS.DEX);
    createStatAndModifier(NewPFCore.STATS.CON);
    createStatAndModifier(NewPFCore.STATS.INT);
    createStatAndModifier(NewPFCore.STATS.WIS);
    createStatAndModifier(NewPFCore.STATS.CHA);
}

export default class NewPFCore {
    static init() {
        createStats();
        CoreController.setPriorityForCategory(StatElement.CLASS_ID, 0);
        CoreController.setPriorityForCategory(StatModifierElement.CLASS_ID, 1);

        createAdditional();
        CoreController.setPriorityForCategory(AdditionalElement.CLASS_ID, 0);

        createSkills();
        CoreController.setPriorityForCategory(SkillElement.CLASS_ID, 3);

        createArmorComponent();
        CoreController.setPriorityForCategory(ArmorComponent.CLASS_ID, 3);

        createArmorValues();
    }
}

NewPFCore.STATS = {
    STR: "str",
    DEX: "dex",
    CON: "con",
    INT: "int",
    WIS: "wis",
    CHA: "cha"
};

NewPFCore.SKILLS = {
    ACROBATICS: "acrob",
    APPRISE: "appr",
    CLIMB: "climb",
    DISGUISE: "disg",
    DIPLOMACY: "dipl",
    INTIMIDATE: "inti",
    KNOWLEDGE_ARCANA: "k_arc",
    KNOWLEDGE_ALCHEMY: "k_alc",
    KNOWLEDGE_DUNGEONEERING: "k_dun",
    KNOWLEDGE_ENGINEERING: "k_eng",
    KNOWLEDGE_GEOGRAPHY: "k_geo",
    KNOWLEDGE_LOCAL: "k_loc",
    KNOWLEDGE_NATURE: "k_nat",
    KNOWLEDGE_RELIGION: "k_rel",
    KNOWLEDGE_PLANES: "k_pla",
    PERCEPTION: "perc",
    SLEIGHT_OF_HANDS: "soh",
    STEALTH: "stealth",
    SWIM: "swim"
};

NewPFCore.ADDITIONALS = {
    ARMOR_PENALTY: "a_penalty"
};

NewPFCore.ARMOR_COMPONENTS = {
    DODGE: "dodge",
    ARMOR: "armor",
    DEFLECT: "deflect",
    SIZE: "size"
};

NewPFCore.ARMOR_RATING = {
    FULL: "ac",
    FLAT_FOOTED: "ff",
    TOUCH: "ta",
    FLAT_TOUCH: "fft"
};

