/**
 * Created by LastBerserk on 01.09.2019.
 */

const DefaultCharacterData = require("../../common/const/DefaultCharacterObject");
import StaticController from "../static/StaticController";

function getDefault(val, def) {
    return !!val ? val : def;
}

function setArray(obj, data) {
    if (data) {
        for (let key in data) {
            if (data[key]) obj[key] = data[key];
        }
    }
}

function getStatsModifiers(obj) {
    const ans = {};
    for (let key in obj) {
        const mod = (obj[key] - 10) / 2;
        ans[key] =  mod < 0 ? Math.floor(mod) : Math.floor(mod);
    }
    return ans;
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
        this.bonuses = getStatsModifiers(this.stats);
        /** @type {OffenseObject} */
        this.offense = DefaultCharacterData.getOffense();
        setArray(this.offense, data.offense);
        /** @type {DefenseObject} */
        this.defense = DefaultCharacterData.getDefense();
        setArray(this.defense, data.defense);
        /** @type {Saves} */
        this.saves = DefaultCharacterData.getSaves();
        setArray(this.saves, data.saves);
    }

    async saveToServer() {
        const char = await StaticController.getCharacter();
        char.level = this.level;
        char.skills = this.skills;
        char.stats = this.stats;
        char.offense = this.offense;
        char.defense = this.defense;
        char.saves = this.defense;
        return StaticController.saveCharacter();
    }
}