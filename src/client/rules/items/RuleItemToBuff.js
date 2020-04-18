/**
 * Created by LastBerserk on 12.04.2020.
 */

import WEARABLE from "./const/RuleWearableList";
import * as IMPL from "../impl/RuleBuffImpl";

export default {
    onUse: {},
    onEquip: {
        [WEARABLE.SPLINT_MAIL]: IMPL.armorBuff.bind(null, WEARABLE.SPLINT_MAIL, 7, 7),
        [WEARABLE.LEATHER_ARMOR]: IMPL.armorBuff.bind(null, WEARABLE.LEATHER_ARMOR, 4, 2),

        [WEARABLE.LAMELLAR]: IMPL.armorBuff.bind(null, WEARABLE.LAMELLAR, 4, 2, 20, 3),
        [WEARABLE.AGILE_BREASTPLATE]: IMPL.armorBuff.bind(null, WEARABLE.AGILE_BREASTPLATE, 6, 4, 25, 3),

        [WEARABLE.BELT_OF_DEXTERITY]: IMPL.dexBuff.bind(null, WEARABLE.BELT_OF_DEXTERITY, 2),
        [WEARABLE.SNARLSHIELD]: IMPL.shieldBuff(null, WEARABLE.SNARLSHIELD, 2)
    }
};