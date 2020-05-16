import RuleActionsConstants from "../constants/RuleActionsConstants";
import TranslationModule from "./TranslationModule";

function getAdditional(add) {
    let str = "";
    if (typeof add === "string") {
        str += add;
    } else {
        if (typeof add.key === "string") {
            str += add.key;
        }
    }
    return str;
}

/**
 *
 * @param {RuleAction} action
 * @returns {Array.<string>}
 */
export function getArgumentsForTranslation(action) {
    const args = [action.isSuccessfull, action.performerObject.name];
    if (action.targetObject) args.push(action.targetObject.name);
    if (action.targetItem) args.push(action.targetItem.key);
    if (action.roll) args.push(action.roll.rollText());
    if (action.additional1) args.push(getAdditional(action.additional1));
    if (action.roll) args.push(action.roll.nextDice.reduce((acc, dd, i) => {
        if (i === 0) {
            return acc + dd.rollText();
        } else {
            return acc + " + " + dd.rollText();
        }
    }, ""));
    if (typeof action.additional2 === "string") args.push(action.additional2);
    return args;
}

export function getKeyForTranslation(action) {
    switch (action.key) {
        case RuleActionsConstants.ACTIVATE_STATE:
        case RuleActionsConstants.COMBAT_MANEUVERS:
        case RuleActionsConstants.DEACTIVATE_STATE:
        case RuleActionsConstants.SPECIAL:
            return action.additional1;
        default:
            return action.key;
    }
}