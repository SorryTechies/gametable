/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWearable from "./RuleWearable";
import RuleDamageType from "../constants/RuleDamageType";
import RuleAcType from "../constants/RuleACType";
import SLOTS from "./const/RuleWearSlots";
import DamageDice from "../../logic/roll/DamageDice";
import RuleWeaponProficiency from "../constants/RuleWeaponProficiency";
import WEAPON from "./const/RuleWeaponConstants";
import RuleItem from "./RuleItem";
import RuleArmorType from "../constants/RuleArmorType";

export default class RuleWeapon extends RuleWearable {
    constructor(key) {
        super(key);
        this.isWeapon = true;
        this.isRanged = false;
        this.critRange = 20;
        this.critMultiplier = 2;
        this.reach = false;
        this.range = 30;
        this.damageDie = 6;
        this.damageType = RuleDamageType.BLUDGEONING;
        this.amountOfDice = 1;
        this.twoHanded = false;
        this.isThrown = false;
        this.acType = RuleAcType.NORMAL;
        this.weaponProficiency = RuleWeaponProficiency.SIMPLE;
        this.proficiency = null;
        this.allowedSlots = [SLOTS.RIGHT_HAND, SLOTS.LEFT_HAND];
    }

    getDamageRoll() {
        const roll = new DamageDice();
        roll.name = this.key;
        roll.amountOfDices = this.amountOfDice;
        roll.criticalModifier = this.critMultiplier;
        roll.die = this.damageDie;
        return roll;
    }

    static fromJson(json) {
        const item = new RuleWeapon(json.key);
        RuleItem.setFromJson(item, json);
        return item;
    }

    /**
     * @param {RuleItem} item
     * @return RuleWeapon
     */
    static generateImprovised(item) {
        const w = new RuleWeapon(WEAPON.IMPROVISED);
        w.weaponProficiency = RuleWeaponProficiency.IMPROVISED;
        return w;
    }

    /**
     * @param {RuleGameObject} obj
     * @return RuleWeapon
     */
    static generateUnarmed(obj) {
        const w = new RuleWeapon(WEAPON.UNARMED_STRIKE);
        w.weaponProficiency = RuleWeaponProficiency.UNARMED;
        return w;
    }
}