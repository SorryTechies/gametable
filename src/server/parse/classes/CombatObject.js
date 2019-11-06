/**
 * Created by LastBerserk on 25.01.2019.
 */

const ParseSubclass = require('../ParseSubclass');

class CombatObject extends ParseSubclass {
    constructor() {
        super(CombatObject.CLASS_NAME);
    }

    /** @return {string} */
    get name() {
        return this.get(CombatObject.NAME_FIELD)
    }

    /** @param {string} name */
    set name(name) {
        this.set(CombatObject.NAME_FIELD, name)
    }

    /** @return {string} */
    get img() {
        return this.get(CombatObject.NAME_FIELD)
    }

    /** @param {string} img */
    set img(img) {
        this.set(CombatObject.IMG_FIELD, img)
    }

    /** @return {int} */
    get x() {
        return this.get(CombatObject.X_FIELD)
    }

    /** @param {int} value */
    set x(value) {
        this.set(CombatObject.X_FIELD, value)
    }

    /** @return {int} */
    get y() {
        return this.get(CombatObject.Y_FIELD)
    }

    /** @param {int} value */
    set y(value) {
        this.set(CombatObject.Y_FIELD, value)
    }

    /** @return {string} */
    get backGroundColor() {
        return this.get(CombatObject.BACKROUND_COLOR_FIELD)
    }

    /** @param {string} value */
    set backGroundColor(value) {
        this.set(CombatObject.BACKROUND_COLOR_FIELD, value)
    }

    /** @return {string} */
    get color() {
        return this.get(CombatObject.COLOR_FIELD)
    }

    /** @param {string} value */
    set color(value) {
        this.set(CombatObject.COLOR_FIELD, value)
    }

    /** @return {Character} */
    get character() {
        return this.get(CombatObject.CHARACTER_FIELD)
    }

    /** @param {Character} value */
    set character(value) {
        this.set(CombatObject.CHARACTER_FIELD, value)
    }

    /**
     * @typedef {{}} Buff
     *
     * @property {boolean} negative
     * @property {int} turns
     * @property {string} name
     * @property {string} description
     */

    /** @return {[Buff]} */
    get buffs() {
        const buffs = this.get(CombatObject.BUFFS_FIELD);
        if (buffs) return buffs;
        return [];
    }

    /** @param {[Buff]} value */
    set buffs(value) {
        this.set(CombatObject.BUFFS_FIELD, value)
    }

    /** @return {int} */
    get initiative() {
        return this.get(CombatObject.INITIATIVE_FIELD);
    }

    /** @param {int} value */
    set initiative(value) {
        this.set(CombatObject.INITIATIVE_FIELD, value)
    }

    /**
     * @typedef {{}} CombatData
     * @property {int} health
     * @property {int} lDamage
     * @property {int} nDamage
     * @property {int} aHealth
     */

    /** @return {CombatData} */
    get data() {
        return this.get(CombatObject.DATA_FIELD);
    }

    /** @param {CombatData} value */
    set data(value) {
        this.set(CombatObject.DATA_FIELD, value)
    }
}

CombatObject.CLASS_NAME = 'CombatObject';
CombatObject.NAME_FIELD = 'name';
CombatObject.IMG_FIELD = 'img';
CombatObject.X_FIELD = 'x';
CombatObject.Y_FIELD = 'y';
CombatObject.BACKROUND_COLOR_FIELD = 'backGroundColor';
CombatObject.COLOR_FIELD = 'color';
CombatObject.CHARACTER_FIELD = 'character';
CombatObject.BUFFS_FIELD = 'buffs';
CombatObject.INITIATIVE_FIELD = 'initiative';
CombatObject.DATA_FIELD = 'data';

module.exports = CombatObject;