import CONST from "../../rules/constants/RuleActionsConstants";
import TranslationModule from "../../rules/translation/TranslationModule";

const state = {
    [CONST.MOVE]: {

    }
};

/**
 * @typedef {{}} CommandButtonState
 * @property {string} icon
 * @property {string} name
 * @property {{}} action
 */

function getNew(key) {
    return {
        icon: "/icons/defaultButtonIcon.png",
        name: TranslationModule.getTranslation(key),
        action: null
    };
}

/**
 * @param {string} key
 * @return {CommandButtonState}
 */
export function getButtonState(key) {
    const def = getNew(key);
    const s = state[key];
    if (s) Object.keys(s).forEach(k => def[k] = s[k]);
    return def;
}