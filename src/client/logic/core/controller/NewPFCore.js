/**
 * Created by LastBerserk on 11.04.2019.
 */

import CoreController from "./CoreController";
import StatElement from "../StatElement";
import StatModifierElement from "../StatModifierElement";
import SkillElement from "../SkillElement";
import AdditionalElement from "../AdditionalElement";

function createStat(tag) {
    return new StatElement(tag);
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

function createAdditional() {
    const armor = new AdditionalElement(NewPFCore.ADDITIONALS.ARMOR_PENALTY);
}

export default class NewPFCore {
    static init() {
        createStatAndModifier(NewPFCore.STATS.STR);
        createStatAndModifier(NewPFCore.STATS.DEX);
        createStatAndModifier(NewPFCore.STATS.CON);
        createStatAndModifier(NewPFCore.STATS.INT);
        createStatAndModifier(NewPFCore.STATS.WIS);
        createStatAndModifier(NewPFCore.STATS.CHA);
        CoreController.setPriorityForCategory(StatElement.CLASS_ID, 0);
        CoreController.setPriorityForCategory(StatModifierElement.CLASS_ID, 1);

        createAdditional();
        CoreController.setPriorityForCategory(AdditionalElement.CLASS_ID, 0);

        createSkills();
        CoreController.setPriorityForCategory(SkillElement.CLASS_ID, 3);
    }

    static calculateAll() {

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
    DEFLECT: "deflect"
};

NewPFCore.ARMOR_RATING = {
    FULL: "ac",
    FLAT_FOOTED: "ff",
    TOUCH: "ta",
    FLAT_TOUCH: "fft"
};