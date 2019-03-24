/**
 * Created by LastBerserk on 25.01.2019.
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

    /** @param {Access} user */
    set user(user) {
        this.set(Character.USER_FIELD, user)
    }

    /** @return {int} */
    get damage() {
        return this.get(Character.DAMAGE_FIELD)
    }

    /** @param {int} damage */
    set damage(damage) {
        this.set(Character.DAMAGE_FIELD, damage)
    }

    /** @return {int} */
    get level() {
        return this.get(Character.LEVEL_FIELD)
    }

    /** @param {int} level */
    set level(level) {
        this.set(Character.LEVEL_FIELD, level)
    }

    /** @return {int} */
    get hpDice() {
        return this.get(Character.HP_DICE_FIELD)
    }

    /** @param {int} hpDice */
    set hpDice(hpDice) {
        this.set(Character.HP_DICE_FIELD, hpDice)
    }

    /** @return {int} */
    get spellSlotsUsed() {
        return this.get(Character.SPELL_SLOTS_USED_FIELD)
    }

    /** @param {int} spellSlotsUsed */
    set spellSlotsUsed(spellSlotsUsed) {
        this.set(Character.SPELL_SLOTS_USED_FIELD, spellSlotsUsed)
    }

    /** @return {int} */
    get spellSlots() {
        return this.get(Character.SPELL_SLOTS_FIELD)
    }

    /** @param {int} spellSlots */
    set spellSlots(spellSlots) {
        this.set(Character.SPELL_SLOTS_FIELD, spellSlots)
    }

    /** @return {[Ability]} */
    get abilities() {
        return this.get(Character.ABILITIES_FIELD)
    }

    /** @param {[Ability]} value */
    set abilities(value) {
        this.set(Character.ABILITIES_FIELD, value)
    }

    /** @return {[Ability]} */
    get spells() {
        return this.get(Character.SPELLS_FIELD)
    }

    /** @param {[Ability]} value */
    set spells(value) {
        this.set(Character.SPELLS_FIELD, value)
    }

    /** @return {[Ability]} */
    get feats() {
        return this.get(Character.FEATS_FIELD)
    }

    /** @param {[Ability]} value */
    set feats(value) {
        this.set(Character.FEATS_FIELD, value)
    }

    /** @return {[Ability]} */
    get items() {
        return this.get(Character.ITEMS_FIELD)
    }

    /** @param {[Ability]} value */
    set items(value) {
        this.set(Character.ITEMS_FIELD, value)
    }

    /**
     * @typedef {{}} StatBlock
     *
     * @property {int} strength
     * @property {int} dexterity
     * @property {int} constitution
     * @property {int} intelligence
     * @property {int} wisdom
     * @property {int} charisma
     */

    /**
     * @typedef {{}} SavesBlock
     *
     * @property {int} fortitude
     * @property {int} f_modifier
     * @property {int} reflex
     * @property {int} r_modifier
     * @property {int} will
     * @property {int} w_modifier
     */

    /**
     * @typedef {{}} Skill
     *
     * @property {int} points
     * @property {boolean} classSkill
     * @property {int} modifier
     */

    /**
     * @typedef {{}} SkillsBlock
     *
     * @property {Skill} acrobatics
     * @property {Skill} appraise
     * @property {Skill} bluff
     * @property {Skill} climb
     * @property {Skill} diplomacy
     * @property {Skill} disable_device
     * @property {Skill} disguise
     * @property {Skill} escape_artist
     * @property {Skill} fly
     * @property {Skill} heal
     * @property {Skill} intimidate
     * @property {Skill} knowledge_arcana
     * @property {Skill} knowledge_dungeneering
     * @property {Skill} knowledge_engineering
     * @property {Skill} knowledge_local
     * @property {Skill} knowledge_planes
     * @property {Skill} knowledge_religion
     * @property {Skill} knowledge_nature
     * @property {Skill} linguistics
     * @property {Skill} perception
     * @property {Skill} ride
     * @property {Skill} sense_motive
     * @property {Skill} sleight_of_hand
     * @property {Skill} spellcraft
     * @property {Skill} stealth
     * @property {Skill} survival
     * @property {Skill} swim
     * @property {Skill} use_magic_device
     */

    /**
     * @typedef {{}} Ability
     *
     * @property {string} name
     * @property {string} description
     * @property {int} range
     * @property {string} target
     */

    /**
     * @typedef {{}} Attack
     *
     * @property {string} id
     */

    /**
     * @typedef {{}} CharacterDataT
     *
     * @property {StatBlock} stats
     * @property {SavesBlock} saves
     * @property {SkillsBlock} skills
     * @property {[Attack]} attacks
     *
     * @property {int} ac_bonus
     * @property {int} attack_bonus
     * @property {int} temp_hp
     */

    /** @return CharacterDataT */
    get data() {
        return this.get(Character.DATA_FIELD)
    }

    /** @param {CharacterDataT} data */
    set data(data) {
        this.set(Character.DATA_FIELD, data)
    }
}

Character.CLASS_NAME = 'Character';
Character.USER_FIELD = 'user';
Character.HP_DICE_FIELD = 'hpDice';
Character.DAMAGE_FIELD = 'damage';
Character.LEVEL_FIELD = 'level';
Character.SPELLS_FIELD = 'spells';
Character.FEATS_FIELD = 'feats';
Character.ITEMS_FIELD = 'items';
Character.ABILITIES_FIELD = 'abilities';
Character.SPELL_SLOTS_USED_FIELD = 'spellSlotsUsed';
Character.DATA_FIELD = 'data';
Character.SPELL_SLOTS_FIELD = 'spellSlots';

module.exports = Character;