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
        [DamageType.PIERCING]: "Колющее",
        [DamageType.BLUDGEONING]: "Дробящее",
        [DamageType.SLASHING]: "Рубящее",
        [DamageType.ENERGY]: "Энергия",
        [DamageType.ICE]: "Лед",
        [DamageType.FIRE]: "Огонь"
    }
};
