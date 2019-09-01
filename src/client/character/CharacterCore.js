/**
 * Created by LastBerserk on 01.09.2019.
 */

const DefaultCharacterData = require("../../common/const/DefaultCharacterObject");

function getDefault(val, def) {
    return !!val ? val : def;
}

function setArray(obj, data) {
    if (Array.isArray(data)) {
        for (let key in data) {
            if (data[key]) obj[key] = data[key];
        }
    }
}

export default class CharacterCore {
    /** @param {Character} data */
    constructor(data) {
        this.level = getDefault(data.level, 0);
        /** @type {SkillsBlock} */
        this.skills = DefaultCharacterData.getSkills();
        setArray(this.skills, data.skills);
        /** @type {StatsObject} */
        this.stats = DefaultCharacterData.getStats();
        setArray(this.stats, data.stats);
        /** @type {OffenseObject} */
        this.offense = DefaultCharacterData.getOffense();
        setArray(this.offense, data.offense);
        /** @type {DefenseObject} */
        this.defense = DefaultCharacterData.getDefense();
        setArray(this.skills, data.defense);
        /** @type {Saves} */
        this.saves = DefaultCharacterData.getSaves();
        setArray(this.saves, data.saves);
    }
}