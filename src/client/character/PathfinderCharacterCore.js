/**
 * Created by LastBerserk on 29.01.2019.
 */

const CharacterHelper = require("../../common/CharacterDataHelper");

function classSkillToString(isClassSkill) {
    return isClassSkill ? "X" : ""
}

function classPointsToString(points) {
    return points > 0 ? points : ""
}

function getSkillSafe(name, skill, bonus) {
    try {
        return [name, classSkillToString(skill.classSkill),
            classPointsToString(skill.points), CharacterHelper.calculateSkill(skill) + bonus]
    } catch (ignore) {
        return [name, "", "", bonus]
    }
}

export default class PathfinderCharacterCore {
    static getStatsCore(data, statBonuses) {
        return [
            ['Strength', data.stats.strength, statBonuses.str],
            ['Dexterity', data.stats.dexterity, statBonuses.dex],
            ['Constitution', data.stats.constitution, statBonuses.con],
            ['Intelligence', data.stats.intelligence, statBonuses.int],
            ['Wisdom', data.stats.wisdom, statBonuses.wis],
            ['Charisma', data.stats.charisma, statBonuses.cha]
        ];
    }

    static getSavesCore(data, statBonuses) {
        return [
            ['Fortitude', data.saves.fortitude + statBonuses.con + data.saves.f_modifier],
            ['Reflex', data.saves.reflex + statBonuses.dex + data.saves.r_modifier],
            ['Will', data.saves.will + statBonuses.wis + data.saves.w_modifier]
        ];
    }

    static getSkillsCore(data, statBonuses) {
        return [
            ['Name', 'Class Skill', 'Points', 'Value'],
            getSkillSafe('Acrobatics', data.skills.acrobatics, statBonuses.dex),
            getSkillSafe('Appraise', data.skills.appraise, statBonuses.int),
            getSkillSafe('Bluff', data.skills.bluff, statBonuses.cha),
            getSkillSafe('Climb', data.skills.climb, statBonuses.str),
            getSkillSafe('Craft', data.skills.craft, statBonuses.int),
            getSkillSafe('Diplomacy', data.skills.diplomacy, statBonuses.cha),
            getSkillSafe('Disable Device', data.skills.disable_device, statBonuses.dex),
            getSkillSafe('Disguise', data.skills.disguise, statBonuses.cha),
            getSkillSafe('Escape Artist', data.skills.escape_artist, statBonuses.dex),
            getSkillSafe('Fly', data.skills.fly, statBonuses.dex),
            getSkillSafe('Heal', data.skills.heal, statBonuses.wis),
            getSkillSafe('Intimidate', data.skills.intimidate, statBonuses.cha),
            getSkillSafe('Knowledge Arcana', data.skills.knowledge_arcana, statBonuses.int),
            getSkillSafe('Knowledge Dungeneering', data.skills.knowledge_dungeneering, statBonuses.int),
            getSkillSafe('Knowledge Engineering', data.skills.knowledge_engineering, statBonuses.int),
            getSkillSafe('Knowledge Local', data.skills.knowledge_local, statBonuses.int),
            getSkillSafe('Knowledge Nature', data.skills.knowledge_nature, statBonuses.int),
            getSkillSafe('Knowledge Planes', data.skills.knowledge_planes, statBonuses.int),
            getSkillSafe('Knowledge Religion', data.skills.knowledge_religion, statBonuses.int),
            getSkillSafe('Linguistics', data.skills.linguistics, statBonuses.int),
            getSkillSafe('Perception', data.skills.perception, statBonuses.wis),
            getSkillSafe('Perform', data.skills.perform, statBonuses.cha),
            getSkillSafe('Ride', data.skills.ride, statBonuses.dex),
            getSkillSafe('Sense Motive', data.skills.sense_motive, statBonuses.wis),
            getSkillSafe('Sleight of Hand', data.skills.sleight_of_hand, statBonuses.dex),
            getSkillSafe('Spellcraft', data.skills.spellcraft, statBonuses.int),
            getSkillSafe('Stealth', data.skills.stealth, statBonuses.dex),
            getSkillSafe('Survival', data.skills.survival, statBonuses.wis),
            getSkillSafe('Swim', data.skills.swim, statBonuses.dex),
            getSkillSafe('Use Magic Device', data.skills.use_magic_device, statBonuses.cha)
        ]
    }

    static getWeaponCore(data, attacks) {
        return [['Name', 'A', 'DD', 'DB', 'Description']].concat(
            attacks.map(item => [
                item.name,
                CharacterHelper.calculateAttackBonus(data, item.hitStat),
                "1d" + item.damageDice,
                CharacterHelper.calculateDamageBonus(data, item.damageStat),
                item.description
            ])
        )
    }
}