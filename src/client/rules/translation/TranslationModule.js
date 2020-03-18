/**
 * Created by LastBerserk on 04.03.2020.
 */

import SupportedLanguages from "./SupportedLanguages";
import FeatsTranslation from "./FeatsTranslation";
import ActionDescriptionTranslation from "./ActionDescriptionTranslation";
import ActionTranslation from "./ActionTranslation";

let currentLanguage = SupportedLanguages.ENG;
const translation = {};

const MODULES = [
    FeatsTranslation,
    ActionTranslation,
    ActionDescriptionTranslation
];

function findInModule(key) {
    const module = MODULES.find(module => Object.keys(module[currentLanguage]).find(item => item === key));
    if (module) {
        return module[currentLanguage][key];
    } else {
        console.warning("No translation found for " + key);
        return key;
    }
}

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
}