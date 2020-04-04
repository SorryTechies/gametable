/**
 * Created by LastBerserk on 04.03.2020.
 */

import SupportedLanguages from "./SupportedLanguages";
import FeatsTranslation from "./FeatsTranslation";
import ActionDescriptionTranslation from "./ActionDescriptionTranslation";
import ActionTranslation from "./ActionTranslation";
import {sendDescription} from "../RuleLoader";

let currentLanguage = SupportedLanguages.ENG;
const translation = {};

const MODULES = [
    FeatsTranslation,
    ActionTranslation
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
     * @param {RuleAction} action
     */
    static getActionTranslation(action) {
        const func =  ActionDescriptionTranslation[currentLanguage][action.isSuccessfull][action.key];
        if (typeof func !== "function") return action.key;
        const args = [action.performerObject.name, action.targetObject.name];
        if (action.roll) args.push(action.roll.result);
        if (action.additional1 && action.additional1.key) args.push(action.additional1.key);
        if (action.roll && action.roll.nextDice.length !== 0) args.push(action.roll.nextDice[0].result);
        if (action.additional2) args.push(action.additional2);
        sendDescription(func(args), action);
    }
}