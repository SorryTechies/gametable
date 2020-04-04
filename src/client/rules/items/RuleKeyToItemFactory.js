/**
 * Created by LastBerserk on 04.04.2020.
 */

import WEAPONS from "./const/RuleWeaponConstants";
import RuleDamageType from "../constants/RuleDamageType";

const itemTable = {
    [WEAPONS.LASER_RIFLE]: {
        maxHealth: 20,
        damageType: RuleDamageType.ENERGY,
        amountOfDice: 2,
        hardeness: 5
    },
    [WEAPONS.SPEAR]: {
        maxHealth: 5,
        damageType: RuleDamageType.PIERCING
    },
    [WEAPONS.IMPROVISED]: {
        maxHealth: -1,
        damageDie: 3,
        hardeness: -1,
    }
};

export function fillItemWithValues(item) {
    const stats = itemTable[item.key];
    if (!stats) throw new Error("Item stats not found " + item.key);
    Object.keys(key => item[key] = stats[key]);
    return item;
}