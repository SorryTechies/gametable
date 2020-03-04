/**
 * Created by LastBerserk on 04.03.2020.
 */

import SupportedLanguages from "./SupportedLanguages";
import FeatsTranslation from "./FeatsTranslation";

let currentLanguage = SupportedLanguages.ENG;

function getModule(module) {
    switch (module) {
        case TranslationModule.MODULES.FEATS:
            return FeatsTranslation[currentLanguage];
        default:
            throw new Error(`No module ${module} found.`);
    }
}

/**
 * @typedef {{}} TranslationNameDescriptionSup
 * @property {string} name
 * @property {string} description
 */

export default class TranslationModule {
    static setLanguage(lang) {
        if (!Object.values(SupportedLanguages).includes(lang)) throw new Error(`Language ${lang} does not supported.`);
        currentLanguage = lang;
    }

    static getTranslation(module, key) {
        return getModule(module)[key];
    }

    /**
     *
     * @param {Array<string>} list
     * @return {Array<TranslationNameDescriptionSup>}
     */
    static getFeatsTranslation(list) {
        return list.reduce((acc, key) => {
                acc[key] = TranslationModule.getTranslation(TranslationModule.MODULES.FEATS, key);
                return acc;
            }, {}
        );
    }
}

TranslationModule.MODULES = {
    FEATS: "feats"
};