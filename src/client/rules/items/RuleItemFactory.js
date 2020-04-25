/**
 * Created by LastBerserk on 16.03.2020.
 */

import RuleWeaponConstants from "./const/RuleWeaponConstants";
import RuleWeapon from "./RuleWeapon";
import RuleItem from "./RuleItem";
import RuleWearableList from "./const/RuleWearableList";
import RuleWearable from "./RuleWearable";
import {fillItemWithValues} from "./RuleKeyToItemFactory";
import RuleShield from "./RuleShield";
import RuleShieldList from "./const/RuleShieldList";

export default class RuleItemFactory {
    static fromJson(json) {
        let item = null;
        if (Object.values(RuleWeaponConstants).includes(json.key)) item = RuleWeapon.fromJson(json);
        if (Object.values(RuleWearableList).includes(json.key)) item = RuleWearable.fromJson(json);
        if (Object.values(RuleShieldList).includes(json.key)) item = RuleShield.fromJson(json);
        if (!item) item = RuleItem.fromJson(json);
        return fillItemWithValues(item);
    }
}