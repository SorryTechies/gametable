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
 * @typedef {{}} SkillsBlock
 *
 * @property {int} acrobatics
 * @property {int} appraise
 * @property {int} bluff
 * @property {int} climb
 * @property {int} diplomacy
 * @property {int} disable_device
 * @property {int} disguise
 * @property {int} escape_artist
 * @property {int} fly
 * @property {int} heal
 * @property {int} intimidate
 * @property {int} knowledge_arcana
 * @property {int} knowledge_dungeneering
 * @property {int} knowledge_engineering
 * @property {int} knowledge_local
 * @property {int} knowledge_planes
 * @property {int} knowledge_religion
 * @property {int} knowledge_nature
 * @property {int} linguistics
 * @property {int} perception
 * @property {int} ride
 * @property {int} sense_motive
 * @property {int} sleight_of_hand
 * @property {int} spellcraft
 * @property {int} stealth
 * @property {int} survival
 * @property {int} swim
 * @property {int} use_magic_device
 * @property {int} handle_animal
 * @property {int} craft
 */
Character.SKILLS_FIELD = "skills";

Character.NAME_FIELD = "name";

module.exports = Character;