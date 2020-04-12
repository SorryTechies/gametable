/**
 * Created by LastBerserk on 12.04.2020.
 */

import WEARABLE from "./const/RuleWearableList";
import {armorBuff} from "../impl/RuleBuffImpl";

export default {
    onUse: {},
    onEquip: {
        [WEARABLE.SPLINT_MAIL]: armorBuff.bind(null, WEARABLE.SPLINT_MAIL, 7, 7),
        [WEARABLE.LEATHER_ARMOR]: armorBuff.bind(null, WEARABLE.LEATHER_ARMOR, 4, 2)
    }
};