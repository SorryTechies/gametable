/**
 * Created by LastBerserk on 01.09.2019.
 */

function createWithDefault(arr, def) {
    return arr.reduce((ans, item) => {
        ans[item] = def;
        return ans;
    }, {});
}

function toKeyArray(obj) {
    const arr = [];
    for (let key in obj) if (obj.hasOwnProperty(key)) {
        arr.push(obj[key]);
    }
    return arr;
}

module.exports.SKILLS_NAMES = {
    ACROBATIC: "acrobatics",
    APPRAISE: "appraise",
    BLUFF: "bluff",
    CLIMB: "climb",
    CRAFT: "craft",
    DIPLOMACY: "diplomacy",
    DISABLE_DEVICE: "disable_device",
    DISGUISE: "disguise",
    ESCAPE_ARTIST: "escape_artist",
    FLY: "fly",
    HANDLE_ANIMAL: "handle_animal",
    HEAL: "heal",
    INTIMIDATE: "intimidate",
    LINGUISTICS: "linguistics",
    PERCEPTION: "perception",
    PERFORM: "perform",
    RIDE: "ride",
    SENSE_MOTIVE: "sense_motive",
    SLEIGHT_OF_HANDS: "sleight_of_hand",
    SPELLCRAFT: "spellcraft",
    STEALTH: "stealth",
    SURVIVAL: "survival",
    SWIM: "swim",
    USE_MAGIC_DEVICE: "use_magic_device",

    KNOWLEDGE_ALCHEMY: "knowledge_alchemy",
    KNOWLEDGE_ARCANA: "knowledge_arcana",
    KNOWLEDGE_DUNGEONEERING: "knowledge_dungeneering",
    KNOWLEDGE_ENGINEERING: "knowledge_engineering",
    KNOWLEDGE_GEOGRAPHY: "knowledge_geography",
    KNOWLEDGE_HISTORY: "knowledge_history",
    KNOWLEDGE_LOCAL: "knowledge_local",
    KNOWLEDGE_NATURE: "knowledge_nature",
    KNOWLEDGE_NOBILITY: "knowledge_nobility",
    KNOWLEDGE_PLANES: "knowledge_planes",
    KNOWLEDGE_RELIGION: "knowledge_religion",
    KNOWLEDGE_SCIENCE: "knowledge_science"
};

module.exports.STATS_NAMES = {
    STRENGTH: "Strength",
    AGILITY: "Agility",
    CONSTITUTION: "Constitution",
    INTELLIGENCE: "Intelligence",
    WISDOM: "Wisdom",
    CHARISMA: "Charisma"
};

module.exports.OFFENSE_NAMES = {
    BAB: "BAB",
    CMB: "CMB"
};

module.exports.DEFENSE_NAMES = {
    AC: "AC",
    FFAC: "FFAC",
    TAC: "TAC",
    FFTAC: "FFTAC",
    CMD: "CMD"
};

module.exports.SAVES_NAMES = {
    FORTITUDE: "fortitude",
    REFLEX: "reflex",
    WILL: "will"
};

module.exports.getSkills = () => createWithDefault(Object.keys(module.exports.SKILLS_NAMES), 0);
module.exports.getStats = () => createWithDefault(Object.keys(module.exports.STATS_NAMES), 10);
module.exports.getOffense = () => createWithDefault(Object.keys(module.exports.OFFENSE_NAMES), 0);
module.exports.getDefense = () => createWithDefault(Object.keys(module.exports.DEFENSE_NAMES), 10);
module.exports.getSaves = () => createWithDefault(Object.keys(module.exports.SAVES_NAMES), 0);