/**
 * Created by LastBerserk on 16.03.2020.
 */

import RuleWeaponConstants from "./const/RuleWeaponConstants";
import RuleWeapon from "./RuleWeapon";
import RuleItem from "./RuleItem";
import RuleWearableList from "./const/RuleWearableList";
import RuleWearable from "./RuleWearable";
import {fillItemWithValues} from "./RuleKeyToItemFactory";

export default class RuleItemFactory {
    static fromJson(json) {
        if (Object.values(RuleWeaponConstants).includes(json.key)) return RuleWeapon.fromJson(json);
        if (Object.values(RuleWearableList).includes(json.key)) return RuleWearable.fromJson(json);
        return fillItemWithValues(RuleItem.fromJson(json));
    }
}