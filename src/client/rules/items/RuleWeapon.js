/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWearable from "./RuleWearable";
import RuleDamageType from "../constants/RuleDamageType";
import RuleAcType from "../constants/RuleACType";
import SLOTS from "./const/RuleWearSlots";
import DamageDice from "../../logic/roll/DamageDice";
import RuleWeaponProficiency from "../constants/RuleWeaponProficiency";

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
        this.additionalTags = [];
        this.amountOfDice = 1;
        this.twoHanded = false;
        this.isThrown = false;
        this.acType = RuleAcType.NORMAL;
        this.proficiency = RuleWeaponProficiency.SIMPLE;
        this.allowedSlots = [SLOTS.RIGHT_HAND];
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
        if (json.id) item.id = json.id;
        if (json.damaged) item.damaged = json.damaged;
        if (json.slot) item.slot = json.slot;
        return item;
    }
}