/**
 * Created by LastBerserk on 09.03.2020.
 */

import SLOTS from "./const/RuleWearSlots";
import RuleWeapon from "./RuleWeapon";
import RuleItem from "./RuleItem";

export default class RuleShield extends RuleWeapon {
    constructor(key) {
        super(key);
        this.isShield = true;
        this.allowedSlots = [SLOTS.LEFT_HAND];
    }

    static fromJson(json) {
        const item = new RuleShield(json.key);
        RuleItem.setFromJson(item, json);
        return item;
    }
}