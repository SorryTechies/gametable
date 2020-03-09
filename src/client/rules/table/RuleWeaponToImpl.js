/**
 * Created by LastBerserk on 09.03.2020.
 */

import RuleWeaponConstants from "../constants/RuleWeaponConstants";
import * as RuleWeaponImpl from "../impl/RuleWeaponImpl";

export default {
    [RuleWeaponConstants.LASER_RIFLE]: RuleWeaponImpl.laserRifleImpl,
    [RuleWeaponConstants.UNARMED_STRIKE]: RuleWeaponImpl.unarmedImpl,
    [RuleWeaponConstants.IMPROVISED]: RuleWeaponImpl.improvisedWeaponImpl
};