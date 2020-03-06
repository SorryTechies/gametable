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
        [RuleFeatsConstants.COMBAT_EXPERTISE]: {
            name: "Combat Expertise (Combat)",
            description: "You can choose to take a –1 penalty on melee attack rolls and combat maneuver checks to gain a +1 dodge bonus to your Armor Class. When your base attack bonus reaches +4, and every +4 thereafter, the penalty increases by –1 and the dodge bonus increases by +1. You can only choose to use this feat when you declare that you are making an attack or a full-attack action with a melee weapon. The effects of this feat last until your next turn."
        },
    }
};