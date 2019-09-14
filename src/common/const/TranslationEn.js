/**
 * Created by LastBerserk on 14.09.2019.
 */
const DefaultCharacterData = require("./DefaultCharacterObject");

module.exports.EN = {
    //STATS
    [DefaultCharacterData.STATS_NAMES.STRENGTH]: "Strength",
    [DefaultCharacterData.STATS_NAMES.AGILITY]: "Agility",
    [DefaultCharacterData.STATS_NAMES.CONSTITUTION]: "Constitution",
    [DefaultCharacterData.STATS_NAMES.WISDOM]: "Wisdom",
    [DefaultCharacterData.STATS_NAMES.CHARISMA]: "Charisma",
    [DefaultCharacterData.STATS_NAMES.INTELLIGENCE]: "Intelligence",
    //SAVES
    [DefaultCharacterData.SAVES_NAMES.FORTITUDE]: "Fortitude",
    [DefaultCharacterData.SAVES_NAMES.REFLEX]: "Reflex",
    [DefaultCharacterData.SAVES_NAMES.WILL]: "Will",
    //SKILLS
    [DefaultCharacterData.SKILLS_NAMES.ACROBATIC]: "Acrobatic",
    [DefaultCharacterData.SKILLS_NAMES.APPRAISE]: "Appraise",
    [DefaultCharacterData.SKILLS_NAMES.BLUFF]: "Bluff",
    [DefaultCharacterData.SKILLS_NAMES.CLIMB]: "Climb",
    [DefaultCharacterData.SKILLS_NAMES.CRAFT]: "Craft",
    [DefaultCharacterData.SKILLS_NAMES.DIPLOMACY]: "Diplomacy",
    [DefaultCharacterData.SKILLS_NAMES.DISABLE_DEVICE]: "Disable device",
    [DefaultCharacterData.SKILLS_NAMES.DISGUISE]: "Disguise",
    [DefaultCharacterData.SKILLS_NAMES.ESCAPE_ARTIST]: "Escape artist",
    [DefaultCharacterData.SKILLS_NAMES.INTIMIDATE]: "Intimidate",
    [DefaultCharacterData.SKILLS_NAMES.FLY]: "Fly",
    [DefaultCharacterData.SKILLS_NAMES.KNOWLEDGE_ARCANA]: "Knowledge arcana",
    [DefaultCharacterData.SKILLS_NAMES.KNOWLEDGE_ALCHEMY]: "Knowledge alchemy",
    [DefaultCharacterData.SKILLS_NAMES.KNOWLEDGE_DUNGEONEERING]: "Knowledge dungeoneering",
    [DefaultCharacterData.SKILLS_NAMES.KNOWLEDGE_ENGINEERING]: "Knowledge engineering",
    [DefaultCharacterData.SKILLS_NAMES.KNOWLEDGE_GEOGRAPHY]: "Knowledge geography",
    [DefaultCharacterData.SKILLS_NAMES.KNOWLEDGE_LOCAL]: "Knowledge local",
    [DefaultCharacterData.SKILLS_NAMES.KNOWLEDGE_RELIGION]: "Knowledge religion",
    [DefaultCharacterData.SKILLS_NAMES.KNOWLEDGE_HISTORY]: "Knowledge history",
    [DefaultCharacterData.SKILLS_NAMES.KNOWLEDGE_NATURE]: "Knowledge nature",
    [DefaultCharacterData.SKILLS_NAMES.HANDLE_ANIMAL]: "Handle animal",
    [DefaultCharacterData.SKILLS_NAMES.HEAL]: "Heal",
    [DefaultCharacterData.SKILLS_NAMES.RIDE]: "Ride",
    [DefaultCharacterData.SKILLS_NAMES.SURVIVAL]: "Survival",
    [DefaultCharacterData.SKILLS_NAMES.STEALTH]: "Stealth",
    [DefaultCharacterData.SKILLS_NAMES.SLEIGHT_OF_HANDS]: "Sleight of hands",
    [DefaultCharacterData.SKILLS_NAMES.SPELLCRAFT]: "Spellcraft",
    [DefaultCharacterData.SKILLS_NAMES.SENSE_MOTIVE]: "Sense motive",
    [DefaultCharacterData.SKILLS_NAMES.SWIM]: "Swim",
    [DefaultCharacterData.SKILLS_NAMES.PERCEPTION]: "Perception",
    [DefaultCharacterData.SKILLS_NAMES.LINGUISTICS]: "Linguistics",
    [DefaultCharacterData.SKILLS_NAMES.USE_MAGIC_DEVICE]: "Use magic device"
};

module.exports.translate = id => {
    for (let key in module.exports.EN) if (key === id) return module.exports.EN[key];
    return id;
};

