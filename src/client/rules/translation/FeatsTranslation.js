/**
 * Created by LastBerserk on 04.03.2020.
 */

import RuleFeatsConstants from "../constants/RuleFeatsConstants";
import SupportedLanguages from "./SupportedLanguages";

export default {
    [SupportedLanguages.ENG]: {
        [RuleFeatsConstants.AXE_TO_GRIND]: {
            name: "Axe to grind",
            description: "You gain a +1 trait bonus on damage against foes who are threatened by only you."
        },
        [RuleFeatsConstants.CARETAKER]: {
            name: "Caretaker",
            description: "You gain a +1 trait bonus on Heal checks, and Heal is always a class skill for you."
        },
    }
};