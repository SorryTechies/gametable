/**
 * Created by LastBerserk on 01.09.2019.
 */
const ParseSubclass = require('../ParseSubclass');

class Character extends ParseSubclass {
    constructor() {
        super(Character.CLASS_NAME);
    }

    /** @return {Access} */
    get user() {
        return this.get(Character.USER_FIELD)
    }

    /** @param {Access} val */
    set user(val) {
        this.set(Character.USER_FIELD, val)
    }

    get level() {
        return this.get(Character.LEVEL_FIELD)
    }

    set level(val) {
        this.set(Character.LEVEL_FIELD, val)
    }

    /** @return {DefenseObject} */
    get defense() {
        return this.get(Character.DEFENSE_FIELD)
    }

    /** @param {DefenseObject} val */
    set defense(val) {
        this.set(Character.DEFENSE_FIELD, val)
    }

    /** @return {OffenseObject} */
    get offense() {
        return this.get(Character.OFFENSE_FIELD)
    }

    /** @param {OffenseObject} val */
    set offense(val) {
        this.set(Character.OFFENSE_FIELD, val)
    }

    /** @return {StatsObject} */
    get stats() {
        return this.get(Character.STATS_FIELD)
    }

    /** @param {StatsObject} val */
    set stats(val) {
        this.set(Character.STATS_FIELD, val)
    }

    /** @return {SkillsBlock} */
    get skills() {
        return this.get(Character.SKILLS_FIELD)
    }

    /** @param {SkillsBlock} val */
    set skills(val) {
        this.set(Character.SKILLS_FIELD, val)
    }

    /** @return {Saves} */
    get saves() {
        return this.get(Character.SAVES_FIELD)
    }

    /** @param {Saves} val */
    set saves(val) {
        this.set(Character.SAVES_FIELD, val)
    }

    /** @return {string} */
    get name() {
        return this.get(Character.NAME_FIELD)
    }

    /** @param {string} val */
    set name(val) {
        this.set(Character.NAME_FIELD, val)
    }

    /** @return {string} */
    get attacks() {
        return this.get(Character.ATTACKS_FIELD)
    }

    /** @param {string} val */
    set attacks(val) {
        this.set(Character.ATTACKS_FIELD, val)
    }

    /** @return {Object} */
    get state() {
        return this.get(Character.STATES_FIELD)
    }

    /** @param {Object} val */
    set state(val) {
        this.set(Character.STATES_FIELD, val)
    }

    get data() {
        return this.get(Character.DATA_FIELED)
    }

    set data(val) {
        this.set(Character.DATA_FIELED, val)
    }
}

Character.CLASS_NAME = "Character";
Character.USER_FIELD = "user";
Character.LEVEL_FIELD = "level";

/**
 * @typedef {{}} DefenseObject
 * @property {int} AC
 * @property {int} FFAC
 * @property {int} TAC
 * @property {int} FFTAC
 * @property {int} CMD
 */
Character.DEFENSE_FIELD = "defense";

/**
 * @typedef {{}} OffenseObject
 * @property {int} BAB
 * @property {int} CMB
 */
Character.OFFENSE_FIELD = "offense";

/**
 * @typedef {{}} StatsObject
 * @property {int} Strength
 * @property {int} Agility
 * @property {int} Constitution
 * @property {int} Intelligence
 * @property {int} Wisdom
 * @property {int} Charisma
 */
Character.STATS_FIELD = "stats";

/**
 * @typedef {{}} Saves
 * @property {int} fortitude
 * @property {int} reflex
 * @property {int} will
 */
Character.SAVES_FIELD = "saves";

/**
 * @typedef {{}} SkillObject
 * 
 * @property {int} value
 * @property {int} ranks
 * @property {boolean} trained
 */

/**
 * @typedef {{}} SkillsBlock
 *
 * @property {SkillObject} acrobatics
 * @property {SkillObject} appraise
 * @property {SkillObject} bluff
 * @property {SkillObject} climb
 * @property {SkillObject} diplomacy
 * @property {SkillObject} disable_device
 * @property {SkillObject} disguise
 * @property {SkillObject} escape_artist
 * @property {SkillObject} fly
 * @property {SkillObject} heal
 * @property {SkillObject} intimidate
 * @property {SkillObject} knowledge_arcana
 * @property {SkillObject} knowledge_dungeneering
 * @property {SkillObject} knowledge_engineering
 * @property {SkillObject} knowledge_local
 * @property {SkillObject} knowledge_planes
 * @property {SkillObject} knowledge_religion
 * @property {SkillObject} knowledge_nature
 * @property {SkillObject} linguistics
 * @property {SkillObject} perception
 * @property {SkillObject} ride
 * @property {SkillObject} sense_motive
 * @property {SkillObject} sleight_of_hand
 * @property {SkillObject} spellcraft
 * @property {SkillObject} stealth
 * @property {SkillObject} survival
 * @property {SkillObject} swim
 * @property {SkillObject} use_magic_device
 * @property {SkillObject} handle_animal
 * @property {SkillObject} craft
 */
Character.SKILLS_FIELD = "skills";

Character.NAME_FIELD = "name";

/**
 * @typedef {{}} SpecialString
 * @property {int} text
 * @property {int} name
 */
Character.ATTACKS_FIELD = "attacks";

Character.STATES_FIELD = "state";

Character.DATA_FIELED = "data";

module.exports = Character;