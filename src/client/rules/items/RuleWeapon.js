/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWearable from "./RuleWearable";
import RuleDamageType from "../constants/RuleDamageType";
import RuleAcType from "../constants/RuleACType";
import SLOTS from "./const/RuleWearSlots";

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
        this.acType = RuleAcType.NORMAL;
        this.allowedSlots = [SLOTS.RIGHT_HAND];
    }

    static fromJson(json) {
        const item = new RuleWeapon(json.key);
        if (!json.id) throw new Error("No id for item.");
        item.id = json.id;
        if (json.damaged) item.damaged = json.damaged;
        if (json.slot) item.slot = json.slot;
        return item;
    }
}