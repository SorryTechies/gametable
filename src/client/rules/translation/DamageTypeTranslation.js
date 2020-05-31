/**
 * Created by LastBerserk on 25.04.2020.
 */

import DamageType from "../constants/RuleDamageType";
import LANG from "./SupportedLanguages";

export default {
    [LANG.ENG]: {
        [DamageType.PIERCING]: "piercing",
        [DamageType.BLUDGEONING]: "bludgeoning",
        [DamageType.SLASHING]: "slashing",
        [DamageType.ENERGY]: "energy",
        [DamageType.ICE]: "ice",
        [DamageType.FIRE]: "fire"
    },
      [LANG.RU]: {
        [DamageType.PIERCING]: "колющий",
        [DamageType.BLUDGEONING]: "дробящий",
        [DamageType.SLASHING]: "рубящий",
        [DamageType.ENERGY]: "энергитический",
        [DamageType.ICE]: "ледяной",
        [DamageType.FIRE]: "огненный"
    }
};
