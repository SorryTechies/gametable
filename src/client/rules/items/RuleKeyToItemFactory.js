/**
 * Created by LastBerserk on 04.04.2020.
 */

import WEAPONS from "./const/RuleWeaponConstants";
import RuleDamageType from "../constants/RuleDamageType";
import WEARABLE from "./const/RuleWearableList";
import SLOTS from "./const/RuleWearSlots";
import SHIELDS from "./const/RuleShieldList";
import TAGS from "../constants/RuleWeaponTags";
import RuleWeaponProficiency from "../constants/RuleWeaponProficiency";
import RuleArmorType from "../constants/RuleArmorType";

const itemTable = {
    [WEAPONS.LASER_RIFLE]: {
        maxHealth: 20,
        damageType: RuleDamageType.ENERGY,
        amountOfDice: 2,
        hardeness: 10,
        proficiency: RuleWeaponProficiency.MARTIAL
    },
    [WEAPONS.SPEAR]: {
        reach: true,
        maxHealth: 5,
        damageType: RuleDamageType.PIERCING
    },
    [WEAPONS.MANOPLE]: {
        maxHealth: 5,
        damageDie: 8,
        proficiency: RuleWeaponProficiency.MARTIAL,
        damageType: RuleDamageType.SLASHING,
        additionalTags: [TAGS.BLOCKING, TAGS.DISARM]
    },
    [WEAPONS.JAVELIN] : {
        maxHealth: 5,
        isThrown: true,
        damageType: RuleDamageType.PIERCING
    },
    [WEAPONS.IMPROVISED]: {
        maxHealth: -1,
        damageDie: 3,
        hardeness: -1,
    },
    [WEARABLE.SPLINT_MAIL]: {
        weight: 45,
        proficiency: RuleArmorType.HEAVY,
        allowedSlots: [SLOTS.ARMOR]
    },
    [WEARABLE.AGILE_BREASTPLATE]: {
        weight: 25,
        proficiency: RuleArmorType.MEDIUM,
        allowedSlots: [SLOTS.ARMOR]
    },
    [WEARABLE.ARMORED_COAT]: {
        weight: 20,
        proficiency: RuleArmorType.MEDIUM,
        allowedSlots: [SLOTS.ARMOR]
    },
    [WEARABLE.BELT_OF_DEXTERITY]: {
        hardeness: 20,
        allowedSlots: [SLOTS.BELT]
    },
    [SHIELDS.SNARLSHIELD]: {
        maxHealth: 20,
        weight: 20,
        hardeness: 10,
        damageDie: 4,
        weaponProficiency: RuleWeaponProficiency.MARTIAL,
        proficiency: RuleArmorType.SHIELD,
    },
    [SHIELDS.DRAGON_SLAYER]: {
        maxHealth: 200,
        weight: 45,
        damageDie: 8,
        amountOfDice: 2,
        damageType: RuleDamageType.SLASHING,
        weaponProficiency: RuleWeaponProficiency.MARTIAL,
        proficiency: RuleArmorType.TOWER_SHIELD,
        hardeness: 10
    }
};

export function fillItemWithValues(item) {
    const stats = itemTable[item.key];
    if (stats) {
        Object.keys(stats).forEach(key => item[key] = stats[key]);
    } else {
        console.warn("Item stats not found for " + item.key);
    }
    return item;
}