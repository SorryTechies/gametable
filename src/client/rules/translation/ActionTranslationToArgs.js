import RuleActionsConstants from "../constants/RuleActionsConstants";
import TranslationModule from "./TranslationModule";

function getAdditional(obj) {
    if (obj.key) {
        if (obj.isItem) {
            // TODO item translation
            let str = obj.key;
            if (obj.damageType) str += " " + TranslationModule.getDamageTypeTranslation(obj.damageType);
            return str;
        } else {
            return obj.key;
        }
    } else {
        return obj;
    }
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
    if (action.additional2) args.push(action.additional2);
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
            action.key;
    }
}