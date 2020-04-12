/**
 * Created by LastBerserk on 04.04.2020.
 */

import WEAPONS from "./const/RuleWeaponConstants";
import RuleDamageType from "../constants/RuleDamageType";
import WEARABLE from "./const/RuleWearableList";
import SLOTS from "./const/RuleWearSlots";

const itemTable = {
    [WEAPONS.LASER_RIFLE]: {
        maxHealth: 20,
        damageType: RuleDamageType.ENERGY,
        amountOfDice: 2,
        hardeness: 5,
        allowedSlots: [SLOTS.RIGHT_HAND]
    },
    [WEAPONS.SPEAR]: {
        reach: true,
        maxHealth: 5,
        damageType: RuleDamageType.PIERCING,
        allowedSlots: [SLOTS.RIGHT_HAND]
    },
    [WEAPONS.IMPROVISED]: {
        maxHealth: -1,
        damageDie: 3,
        hardeness: -1,
    },
    [WEARABLE.SPLINT_MAIL]: {
        maxHealth: 20,
        hardeness: 20,
        allowedSlots: [SLOTS.ARMOR]
    }
};

export function fillItemWithValues(item) {
    const stats = itemTable[item.key];
    if (!stats) throw new Error("Item stats not found " + item.key);
    Object.keys(key => item[key] = stats[key]);
    return item;
}