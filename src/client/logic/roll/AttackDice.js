/**
 * Created by LastBerserk on 15.12.2019.
 */

import CheckDice from "./CheckDice";
import RuleACType from "../../rules/constants/RuleACType";
import STATS from "../../rules/constants/RuleStatConstants";

export default class AttackDice extends CheckDice {
    constructor() {
        super();
        this.attackType = RuleACType.NORMAL;
    }

    /**
     * @param {RuleGameObject} gm
     */
    passed(gm) {
        if (!this.rawResult) return false;
        switch (this.attackType) {
            case RuleACType.NORMAL:
                return this.result >= gm.get(STATS.DEFENCE_AC);
            case RuleACType.TOUCH:
                return this.result >= gm.get(STATS.DEFENCE_TOUCH_AC);
            case RuleACType.FLAT_FOOTED:
                return this.result >= gm.get(STATS.DEFENCE_FLAT_FOOTED_AC);
            case RuleACType.FF_TOUCH:
                return this.result >= gm.get(STATS.DEFENCE_TFF_AC);
            case RuleACType.CMB:
                return this.result >= gm.get(STATS.COMBAT_MANEUVER_DEFENCE);
            case RuleACType.PENETRATING:
                return this.result >= 10;
            default:
                throw new Error("Unknown attack type.");
        }
    }
}