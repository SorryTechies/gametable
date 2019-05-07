/**
 * Created by LastBerserk on 11.04.2019.
 */

import CoreController from "./CoreController";
import BaseStat from "./BaseStat";
import BaseStatModifier from "./BaseStatModifier";

function createStat(tag) {
    const obj = new BaseStat(tag);
    CoreController.addToRoot(obj);
    return obj;
}

function createStatModifier(tag) {
    return new BaseStatModifier(tag);
}

function createStatAndModifier(tag) {
    createStat(tag);
    createStatModifier(tag);
}

function createSkill(tag, stat) {
    return new BaseStat(tag, stat);
}

export default class NewPFCore {
    static init() {
        createStatAndModifier(NewPFCore.STATS.STR);
        createStatAndModifier(NewPFCore.STATS.DEX);
        createStatAndModifier(NewPFCore.STATS.CON);
        createStatAndModifier(NewPFCore.STATS.INT);
        createStatAndModifier(NewPFCore.STATS.WIS);
        createStatAndModifier(NewPFCore.STATS.CHA);

        createSkill(NewPFCore.SKILLS.ACROBATICS, NewPFCore.STATS.DEX);
        createSkill(NewPFCore.SKILLS.CLIMB, NewPFCore.STATS.STR);
        createSkill(NewPFCore.SKILLS.DISGUISE, NewPFCore.STATS.WIS);
        createSkill(NewPFCore.SKILLS.KNOWLEDGE_ARCANA, NewPFCore.STATS.INT);
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
    CLIMB: "climb",
    DISGUISE: "disg",
    KNOWLEDGE_ARCANA: "k_arc"
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