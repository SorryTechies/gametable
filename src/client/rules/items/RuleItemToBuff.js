/**
 * Created by LastBerserk on 12.04.2020.
 */

import WEARABLE from "./const/RuleWearableList";
import * as IMPL from "../impl/RuleBuffImpl";
import WEAPONS from "./const/RuleWeaponConstants";

export default {
    onUse: {},
    onEquip: {
        [WEARABLE.SPLINT_MAIL]: IMPL.armorBuff.bind(null, WEARABLE.SPLINT_MAIL, 7, 7, 0, 0),
        [WEARABLE.LEATHER_ARMOR]: IMPL.armorBuff.bind(null, WEARABLE.LEATHER_ARMOR, 4, 2, 0, 0),

        [WEARABLE.LAMELLAR]: IMPL.armorBuff.bind(null, WEARABLE.LAMELLAR, 4, 2, 20, 3),
        [WEARABLE.AGILE_BREASTPLATE]: IMPL.armorBuff.bind(null, WEARABLE.AGILE_BREASTPLATE, 6, 4, 25, 3),

        [WEARABLE.BELT_OF_DEXTERITY]: IMPL.dexBuff.bind(null, WEARABLE.BELT_OF_DEXTERITY, 2),
        [WEARABLE.SNARLSHIELD]: IMPL.shieldBuff.bind(null, WEARABLE.SNARLSHIELD, 2, 0, 0, 0),

        [WEAPONS.DRAGON_SLAYER]: IMPL.towerShieldBuff.bind(null, WEAPONS.DRAGON_SLAYER, 4, 10, 50, 2),
    }
};