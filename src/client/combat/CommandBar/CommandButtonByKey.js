import CONST from "../../rules/constants/RuleActionsConstants";
import TranslationModule from "../../rules/translation/TranslationModule";

const NO_SELECTION = "no_selection";

const state = {
    [NO_SELECTION]: {
        icon: "/icons/defaultButtonIcon.png",
        name: "No action selected"
    },
    [CONST.MOVE]: {
        icon: "/icons/moveIcon.png",
        name: "Move"
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
 * @param {ButtonLayoutBean} layout
 * @return {CommandButtonState}
 */
export function getButtonState(layout) {
    if (layout && layout.key) {
        let final = layout;
        if (final.next) final = final.next;
        const def = getNew(final.key);
        const s = state[final.key];
        if (s) Object.keys(s).forEach(k => def[k] = s[k]);
        return def;
    } else {
        return getNew(NO_SELECTION);
    }
}