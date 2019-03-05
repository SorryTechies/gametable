/**
 * Created by LastBerserk on 27.01.2019.
 */

const DEFAULT_STAT = 10;

function getSkill() {
    return {
        classSkill: false,
        modifier: 0,
        points: 0
    }
}

class CharacterDataHelper {
    static createDefault() {
        /** @type {CharacterDataT} */
        let data = {};

        data.ac_bonus = 0;
        data.attack_bonus = 0;
        data.temp_hp = 0;

        data.stats = {};
        data.stats.strength = DEFAULT_STAT;
        data.stats.dexterity = DEFAULT_STAT;
        data.stats.constitution = DEFAULT_STAT;
        data.stats.intelligence = DEFAULT_STAT;
        data.stats.wisdom = DEFAULT_STAT;
        data.stats.charisma = DEFAULT_STAT;

        data.saves = {};
        data.saves.fortitude = 0;
        data.saves.reflex = 0;
        data.saves.will = 0;
        data.saves.f_modifier = 0;
        data.saves.r_modifier = 0;
        data.saves.w_modifier = 0;

        data.skills = {};
        data.skills.acrobatics = getSkill();
        data.skills.appraise = getSkill();
        data.skills.bluff = getSkill();
        data.skills.climb = getSkill();
        data.skills.diplomacy = getSkill();
        data.skills.disable_device = getSkill();
        data.skills.disguise = getSkill();
        data.skills.escape_artist = getSkill();
        data.skills.fly = getSkill();
        data.skills.heal = getSkill();
        data.skills.intimidate = getSkill();
        data.skills.knowledge_arcana = getSkill();
        data.skills.knowledge_dungeneering = getSkill();
        data.skills.knowledge_engineering = getSkill();
        data.skills.knowledge_local = getSkill();
        data.skills.knowledge_nature = getSkill();
        data.skills.knowledge_planes = getSkill();
        data.skills.knowledge_religion = getSkill();
        data.skills.linguistics = getSkill();
        data.skills.perception = getSkill();
        data.skills.ride = getSkill();
        data.skills.sense_motive = getSkill();
        data.skills.sleight_of_hand = getSkill();
        data.skills.spellcraft = getSkill();
        data.skills.stealth = getSkill();
        data.skills.survival = getSkill();
        data.skills.swim = getSkill();
        data.skills.use_magic_device = getSkill();

        data.attacks = [];
        data.abilities = [];
        data.spells = [];

        return data;
    }

    static calculateStatBonus(statValue) {
        return Math.floor((statValue - DEFAULT_STAT) / 2);
    }

    static calculateMaxHp(character) {
        /** @type {CharacterDataT} */
        const data = character.data;
        return character.hpDice * character.level + this.calculateStatBonus(data.stats.constitution) + character.temp_hp;
    }

    static calculateSkill(skill) {
        return skill.points > 0 && skill.classSkill > 0 ?
            skill.points + skill.modifier + 3 :
            skill.points + skill.modifier
    }

    static getStatBonus(character, stat) {
        switch (stat) {
            case 'S':
                return this.calculateStatBonus(character.stats.strength);
            case 'D':
                return this.calculateStatBonus(character.stats.dexterity);
            case 'I':
                return this.calculateStatBonus(character.stats.intelligence);
            case 'W':
                return this.calculateStatBonus(character.stats.wisdom);
            case 'C':
                return this.calculateStatBonus(character.stats.charisma);
            default:
                return 0;
        }
    }

    /**
     * @param {CharacterDataT} character
     * @param {string} hitStat
     */
    static calculateAttackBonus(character, hitStat) {
        return this.getStatBonus(character, hitStat) + character.attack_bonus;
    }

    /**
     * @param {CharacterDataT} character
     * @param {string} damageState
     */
    static calculateDamageBonus(character, damageState) {
        return this.getStatBonus(character, damageState);
    }
}

module.exports = CharacterDataHelper;