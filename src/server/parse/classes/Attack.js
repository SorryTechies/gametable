/**
 * Created by LastBerserk on 25.01.2019.
 */

const ParseSubclass = require('../ParseSubclass');

class Attack extends ParseSubclass {
    constructor() {
        super(Attack.CLASS_NAME);
    }

    /** @return {string} */
    get name() {
        return this.get(Attack.NAME_FIELD)
    }

    /** @param {string} name */
    set name(name) {
        this.set(Attack.NAME_FIELD, name)
    }

    /** @return {string} */
    get description() {
        return this.get(Attack.DESCRIPTION_FIELD)
    }

    /** @param {string} description */
    set description(description) {
        this.set(Attack.DESCRIPTION_FIELD, description)
    }

    /** @return {int} */
    get damageDice() {
        return this.get(Attack.DAMAGE_DICE_FIELD)
    }

    /** @param {int} damageDice */
    set damageDice(damageDice) {
        this.set(Attack.DAMAGE_DICE_FIELD, damageDice)
    }

    /** @return {string} */
    get hitStat() {
        return this.get(Attack.HIT_FIELD)
    }

    /** @param {string} hitStat */
    set hitStat(hitStat) {
        this.set(Attack.HIT_FIELD, hitStat)
    }

    /** @return {string} */
    get damageStat() {
        return this.get(Attack.DAMAGE_STAT)
    }

    /** @param {string} damageStat */
    set damageStat(damageStat) {
        this.set(Attack.DAMAGE_STAT, damageStat)
    }
}

Attack.CLASS_NAME = 'Attack';
Attack.NAME_FIELD = 'name';
Attack.DESCRIPTION_FIELD = 'description';
Attack.DAMAGE_DICE_FIELD = 'damageDice';
Attack.HIT_FIELD = 'hitStat';
Attack.DAMAGE_STAT = 'damageStat';

module.exports = Attack;