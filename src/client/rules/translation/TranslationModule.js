/**
 * Created by LastBerserk on 04.03.2020.
 */

import SupportedLanguages from "./SupportedLanguages";
import FeatsTranslation from "./FeatsTranslation";
import ActionDescriptionTranslation from "./ActionDescriptionTranslation";
import ActionTranslation from "./ActionTranslation";
import SkillTranslation from "./SkillTranslation";
import DamageTypeTranslation from "./DamageTypeTranslation";

let currentLanguage = SupportedLanguages.ENG;
const translation = {};

const MODULES = [
    FeatsTranslation,
    ActionTranslation,
    SkillTranslation
];

function process(key, val, args) {
    if (typeof val === "function") {
        return val(args);
    } else {
        if (val) {
            return val;
        } else {
            return key;
        }
    }
}

/**
 * @typedef {{}} TranslationNameDescriptionSup
 * @property {string} name
 * @property {string} description
 */

export default class TranslationModule {
    static init() {
        MODULES.forEach(module =>
            Object.keys(module[currentLanguage])
                .forEach(key => translation[key] = module[currentLanguage][key])
        );
    }

    static setLanguage(lang) {
        if (!Object.values(SupportedLanguages).includes(lang)) throw new Error(`Language ${lang} does not supported.`);
        currentLanguage = lang;
    }

    static getTranslation(key, ...args) {
        return process(key, translation[key], args);
    }

    /**
     *
     * @param {Array<string>} list
     * @return {Array<TranslationNameDescriptionSup>}
     */
    static getFeatsTranslation(list) {
        return list.reduce((acc, key) => {
                acc[key] = process(key, translation[key]);
                return acc;
            }, {}
        );
    }

    /**
     * @param {string} key
     * @param {Array.<string>} args
     * @return {string}
     */
    static getActionTranslation(key, args) {
        let func = ActionDescriptionTranslation[currentLanguage][args[0]][key];
        if (typeof func !== "function") return key;
        args.splice(0, 1);
        return func(args);
    }

    static getDamageTypeTranslation(damageType) {
        const str = DamageTypeTranslation[currentLanguage][damageType];
        if (str) {
            return str;
        } else {
            return damageType;
        }
    }
}