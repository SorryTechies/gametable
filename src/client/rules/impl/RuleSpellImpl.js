/**
 * Created by LastBerserk on 22.03.2020.
 */

import RuleConstants from "../constants/RuleStatConstants";
import * as RuleLoader from "../RuleLoader";
import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleGameObjectConstans from "../constants/RuleGameObjectConstants";
import {getMeleeAttackImpl} from "./RuleCommonImpl";
import DamageDice from "../../logic/roll/DamageDice";

export const doShockGrasp = action => {
    const target = action.targetObject;
    const performer = action.performerObject;
    const perfCharacter = performer.ruleCharacter;
    let numberOfDices = perfCharacter.get(RuleConstants.CASTER_LEVEL);
    if (numberOfDices > 5) numberOfDices = 5;
    // TODO IMPLEMENT TOUCH BUFF INSTEAD OF DISCHARGE
    const roll = getMeleeAttackImpl(perfCharacter);
    roll.name = "Touch";
    const damageRoll = new DamageDice();
    damageRoll.canBeCritical = false;
    damageRoll.amountOfDices = numberOfDices;
    roll.nextDice.push(damageRoll);
    roll.roll();
    if (roll.result >= target.get(RuleConstants.DEFENCE_TOUCH_AC)) {
        target.dealDamage(damageRoll.result);
        RuleLoader.getLoader().sendActionDescription(
            `${action.performerObject.name} casts Shocking Grasps on ${action.targetObject.name} dealing ${damageRoll.result} electric damage.`,
            action
        );
        RuleCharacterChangesBean.addDataModification(action.target, RuleGameObjectConstans.LETHAL_DAMAGE, damageRoll.result);
    } else {
        RuleLoader.getLoader().sendActionDescription(
            `${action.performerObject.name} casts Shocking Grasps on ${action.targetObject.name} and misses.`,
            action
        );
    }
};