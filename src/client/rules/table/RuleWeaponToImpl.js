/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWeaponToImpl from "../constants/RuleWeaponConstants";
import * as RuleWeaponImpl from "../impl/RuleWeaponImpl";

export default {
    [RuleWeaponToImpl.LASER_RIFLE]: RuleWeaponImpl.laserRifleImpl
};