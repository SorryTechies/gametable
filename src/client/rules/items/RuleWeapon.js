/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWearable from "./RuleWearable";
import RuleDamageType from "../constants/RuleDamageType";
import RuleAcType from "../constants/RuleACType";

export default class RuleWeapon extends RuleWearable {
    constructor(key) {
        super(key);
        this.isWeapon = true;
        this.isRanged = false;
        this.reach = 1;
        this.damageDie = 6;
        this.damageType = RuleDamageType.BLUDGEONING;
        this.amountOfDice = 1;
        this.acType = RuleAcType.NORMAL;
    }

    static fromJson(json) {
        const item = new RuleWeapon(json.key);
        item.id = json.id;
        item.health = json.health;
        item.slot = json.slot;
        return item;
    }
}