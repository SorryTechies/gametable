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
    DIPLOMACY: "diplomacy",
    DISABLE_DEVICE: "disable_device",
    DISGUISE: "disguise",
    ESCAPE_ARTIST: "escape_artist",
    FLY: "fly",
    HEAL: "heal",
    INTIMIDATE: "intimidate",
    LINGUISTICS: "linguistics",
    PERCEPTION: "perception",
    RIDE: "ride",
    SENSE_MOTIVE: "sense_motive",
    SLEIGHT_OF_HANDS: "sleight_of_hand",
    SPELLCRAFT: "spellcraft",
    STEALTH: "stealth",
    SURVIVAL: "survival",
    SWIM: "swim",
    USE_MAGIC_DEVICE: "use_magic_device",
    HANDLE_ANIMAL: "handle_animal",
    CRAFT: "craft",

    KNOWLEDGE_ALCHEMY: "knowledge_alchemy",
    KNOWLEDGE_ARCANA: "knowledge_arcana",
    KNOWLEDGE_GEOGRAPHY: "knowledge_geography",
    KNOWLEDGE_ENGINEERING: "knowledge_engineering",
    KNOWLEDGE_DUNGEONEERING: "knowledge_dungeneering",
    KNOWLEDGE_LOCAL: "knowledge_local",
    KNOWLEDGE_PLANES: "knowledge_planes",
    KNOWLEDGE_RELIGION: "knowledge_religion",
    KNOWLEDGE_HISTORY: "knowledge_history"
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

module.exports.SKILL_NAMES_ARRAY = toKeyArray(module.exports.SKILLS_NAMES);
module.exports.STATS_NAMES_ARRAY = toKeyArray(module.exports.STATS_NAMES);
module.exports.OFFENSE_NAMES_OFFENSE = toKeyArray(module.exports.OFFENSE_NAMES);
module.exports.DEFENSE_NAMES_ARRAY = toKeyArray(module.exports.DEFENSE_NAMES);
module.exports.SAVES_NAMES_ARRAY = toKeyArray(module.exports.SAVES_NAMES);

module.exports.getSkills = () => createWithDefault(module.exports.SKILL_NAMES_ARRAY, 0);
module.exports.getStats = () => createWithDefault(module.exports.STATS_NAMES_ARRAY, 10);
module.exports.getOffense = () => createWithDefault(module.exports.OFFENSE_NAMES_OFFENSE, 0);
module.exports.getDefense = () => createWithDefault(module.exports.DEFENSE_NAMES_ARRAY, 10);
module.exports.getSaves = () => createWithDefault(module.exports.SAVES_NAMES_ARRAY, 0);