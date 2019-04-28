/**
 * Created by LastBerserk on 28.04.2019.
 */

class PFCoreConstants {
    
}


PFCoreConstants.STATS = {
    CATEGORY: "stat",
    STR: "str",
    DEX: "dex",
    CON: "con",
    INT: "int",
    WIS: "wis",
    CHA: "cha"
};

PFCoreConstants.SKILLS = {
    CATEGORY: "skill",
    ACROBATICS: "acrob",
    APPRISE: "appr",
    CLIMB: "climb",
    DISGUISE: "disg",
    DIPLOMACY: "dipl",
    FLY: "fly",
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
    PERFORM: "perf",
    SENSE_MOTIVE: "smot",
    SPELLCRAFT: "spc",
    SLEIGHT_OF_HANDS: "soh",
    STEALTH: "stealth",
    SURVIVAL: "surv",
    SWIM: "swim",
    USE_MAGIC_DEVICE: "umg"
};

PFCoreConstants.ADDITIONALS = {
    CATEGORY: "additional",
    ARMOR_PENALTY: "a_penalty",
    BASE_ATTACK_BONUS: "bab",
    COMBAT_MANEUVER_BONUS: "cmb",
    COMBAT_MANEUVER_DEFENSE: "cmd",
    SIZE: "size"
};

PFCoreConstants.ARMOR_COMPONENTS = {
    CATEGORY: "armor_component",
    DODGE: "dodge",
    ARMOR: "armor",
    DEFLECT: "deflect"
};

PFCoreConstants.ARMOR_RATING = {
    CATEGORY: "armor_rating",
    FULL: "ac",
    FLAT_FOOTED: "ff",
    TOUCH: "ta",
    FLAT_TOUCH: "fft"
};

module.exports = PFCoreConstants;