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
        hardeness: 5
    },
    [WEAPONS.SPEAR]: {
        reach: true,
        maxHealth: 5,
        damageType: RuleDamageType.PIERCING
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
    },
    [WEARABLE.AGILE_BREASTPLATE]: {
        maxHealth: 20,
        hardeness: 20,
        allowedSlots: [SLOTS.ARMOR]
    },
    [WEARABLE.SNARLSHIELD]: {
        maxHealth: 20,
        hardeness: 20
    },
    [WEARABLE.BELT_OF_DEXTERITY]: {
        maxHealth: 20,
        hardeness: 20,
        allowedSlots: [SLOTS.BELT]
    }
};

export function fillItemWithValues(item) {
    const stats = itemTable[item.key];
    if (!stats) throw new Error("Item stats not found " + item.key);
    Object.keys(stats).forEach(key => item[key] = stats[key]);
    return item;
}