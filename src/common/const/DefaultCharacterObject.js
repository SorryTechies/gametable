/**
 * Created by LastBerserk on 01.09.2019.
 */

function createWithDefault(arr, def) {
    return arr.reduce((ans, item) => {
        ans[item] = def;
        return ans;
    }, {});
}

module.exports.SKILL_NAMES = [
    "acrobatics",
    "appraise",
    "bluff",
    "climb",
    "diplomacy",
    "disable_device",
    "disguise",
    "escape_artist",
    "fly",
    "heal",
    "intimidate",
    "knowledge_arcana",
    "knowledge_dungeneering",
    "knowledge_engineering",
    "knowledge_local",
    "knowledge_planes",
    "knowledge_religion",
    "knowledge_nature",
    "linguistics",
    "perception",
    "ride",
    "sense_motive",
    "sleight_of_hand",
    "spellcraft",
    "stealth",
    "survival",
    "swim",
    "use_magic_device",
    "handle_animal",
    "craft"
];
module.exports.getSkills = () => {
    return createWithDefault(module.exports.SKILL_NAMES, 0);
};

module.exports.STATS_NAMES = [
    "Strength",
    "Agility",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma"
];
module.exports.getStats = () => {
    return createWithDefault(module.exports.STATS_NAMES, 10);
};

module.exports.OFFENSE_NAMES = [
    "BAB",
    "CMB"
];
module.exports.getOffense = () => {
    return createWithDefault(module.exports.OFFENSE_NAMES, 0);
};

module.exports.DEFENSE_NAMES = [
    "AC",
    "FFAC",
    "TAC",
    "FFTAC",
    "CMD"
];
module.exports.getDefense = () => {
    return createWithDefault(module.exports.DEFENSE_NAMES, 10);
};

module.exports.SAVES_NAMES = [
    "fortitude",
    "reflex",
    "will"
];
module.exports.getSaves = () => {
    return createWithDefault(module.exports.SAVES_NAMES, 0);
};