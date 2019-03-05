/**
 * Created by LastBerserk on 27.01.2019.
 */

const Character = require("../parse/classes/Character");
const CharacterHelper = require("../../common/CharacterDataHelper");

//VATAN
let VATAN = new Character();
VATAN.damage = 0;
VATAN.hpDice = 8;
VATAN.level = 2;
VATAN.spellSlots = 0;
VATAN.spellSlotsUsed = 0;
VATAN.user = {
    "__type": "Pointer",
    "className": "Access",
    "objectId": "4cPLcgJKDO"
};

VATAN.data = CharacterHelper.createDefault();
VATAN.data.stats.dexterity = 12;
VATAN.data.stats.intelligence = 14;
VATAN.data.stats.wisdom = 8;
VATAN.data.stats.charisma = 14;

VATAN.data.attack_bonus = 1;

VATAN.data.saves.reflex = 3;

VATAN.data.skills.acrobatics.points = 2;
VATAN.data.skills.acrobatics.classSkill = true;
VATAN.data.skills.appraise.classSkill = true;
VATAN.data.skills.bluff.classSkill = true;
VATAN.data.skills.bluff.points = 5;
VATAN.data.skills.climb.classSkill = true;
VATAN.data.skills.diplomacy.points = 5;
VATAN.data.skills.diplomacy.classSkill = true;
VATAN.data.skills.disable_device.classSkill = true;
VATAN.data.skills.disguise.classSkill = true;
VATAN.data.skills.escape_artist.classSkill = true;
VATAN.data.skills.intimidate.classSkill = true;
VATAN.data.skills.knowledge_local.classSkill = true;
VATAN.data.skills.linguistics.classSkill = true;
VATAN.data.skills.linguistics.points = 1;
VATAN.data.skills.perception.classSkill = true;
VATAN.data.skills.perception.points = 1;
VATAN.data.skills.perception.modifier = -1;
VATAN.data.skills.sense_motive.classSkill = true;
VATAN.data.skills.sleight_of_hand.classSkill = true;
VATAN.data.skills.sleight_of_hand.points = 2;
VATAN.data.skills.sleight_of_hand.modifier = 1;
VATAN.data.skills.stealth.classSkill = true;
VATAN.data.skills.stealth.points = 3;
VATAN.data.skills.swim.classSkill = true;
VATAN.data.skills.use_magic_device.classSkill = true;

VATAN.save();

//MILTAEL
let MILTAEL = new Character();
MILTAEL.damage = 0;
MILTAEL.hpDice = 8;
MILTAEL.level = 2;
MILTAEL.spellSlots = 0;
MILTAEL.spellSlotsUsed = 0;
MILTAEL.user = {
    "__type": "Pointer",
    "className": "Access",
    "objectId": "f3leOWA1ri"
};

MILTAEL.data = CharacterHelper.createDefault();
MILTAEL.data.stats.strength = 8;
MILTAEL.data.stats.dexterity = 14;
MILTAEL.data.stats.intelligence = 14;
MILTAEL.data.stats.charisma = 12;

MILTAEL.data.attack_bonus = 1;

MILTAEL.data.saves.reflex = 3;
MILTAEL.data.saves.will = 3;

MILTAEL.data.skills.acrobatics.points = 2;
MILTAEL.data.skills.acrobatics.classSkill = true;
MILTAEL.data.skills.appraise.classSkill = true;
MILTAEL.data.skills.bluff.classSkill = true;
MILTAEL.data.skills.climb.classSkill = true;
MILTAEL.data.skills.climb.points = 2;
MILTAEL.data.skills.diplomacy.classSkill = true;
MILTAEL.data.skills.disable_device.classSkill = true;
MILTAEL.data.skills.disable_device.points = 2;
MILTAEL.data.skills.disguise.classSkill = true;
MILTAEL.data.skills.escape_artist.classSkill = true;
MILTAEL.data.skills.heal.classSkill = true;
MILTAEL.data.skills.intimidate.classSkill = true;
MILTAEL.data.skills.knowledge_arcana.classSkill = true;
MILTAEL.data.skills.knowledge_engineering.classSkill = true;
MILTAEL.data.skills.knowledge_dungeneering.classSkill = true;
MILTAEL.data.skills.knowledge_religion.classSkill = true;
MILTAEL.data.skills.knowledge_planes.classSkill = true;
MILTAEL.data.skills.knowledge_local.classSkill = true;
MILTAEL.data.skills.knowledge_local.points = 3;
MILTAEL.data.skills.linguistics.classSkill = true;
MILTAEL.data.skills.perception.classSkill = true;
MILTAEL.data.skills.perception.points = 5;
MILTAEL.data.skills.sense_motive.classSkill = true;
MILTAEL.data.skills.spellcraft.classSkill = true;
MILTAEL.data.skills.sleight_of_hand.classSkill = true;
MILTAEL.data.skills.stealth.classSkill = true;
MILTAEL.data.skills.stealth.points = 1;
MILTAEL.data.skills.swim.classSkill = true;
MILTAEL.data.skills.use_magic_device.classSkill = true;

MILTAEL.save();

//RUR
let RUR = new Character();
RUR.damage = 0;
RUR.hpDice = 6;
RUR.level = 2;
RUR.spellSlots = 0;
RUR.spellSlotsUsed = 0;
RUR.user = {
    "__type": "Pointer",
    "className": "Access",
    "objectId": "f8ApqOCNcC"
};

RUR.data = CharacterHelper.createDefault();
RUR.data.stats.strength = 8;
RUR.data.stats.dexterity = 8;
RUR.data.stats.intelligence = 18;
RUR.data.stats.wisdom = 20;
RUR.data.stats.charisma = 2;

RUR.data.attack_bonus = 1;

RUR.data.saves.will = 3;

RUR.data.skills.appraise.classSkill = true;
RUR.data.skills.bluff.classSkill = true;
RUR.data.skills.fly.classSkill = true;
RUR.data.skills.knowledge_arcana.classSkill = true;
RUR.data.skills.knowledge_arcana.points = 4;
RUR.data.skills.knowledge_engineering.points = 1;
RUR.data.skills.knowledge_planes.classSkill = true;
RUR.data.skills.perception.points = 5;
RUR.data.skills.perception.modifier = 4;
RUR.data.skills.sense_motive.modifier = 2;
RUR.data.skills.spellcraft.classSkill = true;
RUR.data.skills.spellcraft.points = 1;
RUR.data.skills.use_magic_device.classSkill = true;

RUR.save();

module.exports = {
    rur: RUR,
    vatan: VATAN,
    milt: MILTAEL
};
