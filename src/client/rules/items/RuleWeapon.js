/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWearable from "./RuleWearable";

export default class RuleWeapon extends RuleWearable {
    constructor(key) {
        super(key);
        this.isWeapon = true;
        this.reach = 1;
        this.damageDie = 6;
        this.amountOfDice = 1;
    }

    static fromJson(json) {
        const item = new RuleWeapon(json.key);
        item.id = json.id;
        item.health = json.health;
        item.slot = json.slot;
        return item;
    }
}