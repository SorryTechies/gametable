/**
 * Created by LastBerserk on 21.01.2020.
 */

import RuleConstants from "../RuleConstants";
import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleGameObjectConstans from "../constants/RuleGameObjectConstants";
import CheckDice from "../../logic/roll/CheckDice";
import DamageDice from "../../logic/roll/DamageDice";
import RuleState from "../RuleState";
import {calculateAttack} from "./RuleCommonImpl";
import * as RuleLoader from "../RuleLoader";

function getStrAttackRoll(character) {
    const roll = new CheckDice();
    roll.bonus = character.get(RuleConstants.BAB) + character.get(RuleConstants.MOD_STRENGTH);
    return roll;
}

export const doMove = action => {
    action.performerObject.position = action.target;
    RuleCharacterChangesBean.addModification(action.performerId, "position", action.target);
};

export const doTotalDefence = action => {
    RuleLoader.getLoader().sendActionDescription(
        `${action.performerObject.name} starts raging!`,
        action
    );
    RuleState.doTotalDefenceState(action);
};
export const doAttack = action => {
    const obj = action.targetObject;
    const attack = calculateAttack(action);
    const damage = 1;
    obj.dealDamage(damage);
    RuleLoader.getLoader().sendActionDescription(
        `${action.performerObject.name} attacks ${action.targetObject.name} for ${damage} damage.`,
        action
    );
    RuleCharacterChangesBean.addDataModification(action.performerId, RuleGameObjectConstans.LETHAL_DAMAGE, damage);
};

export const doShockGrasp = action => {
    const target = action.targetObject;
    const performer = action.performerObject;
    const perfCharacter = performer.ruleCharacter;
    let numberOfDices = perfCharacter.get(RuleConstants.CASTER_LEVEL);
    if (numberOfDices > 5) numberOfDices = 5;
    // TODO IMPLEMENT TOUCH BUFF INSTEAD OF DISCHARGE
    const roll = getStrAttackRoll(perfCharacter);
    roll.name = "Touch";
    const damageRoll = new DamageDice();
    damageRoll.canBeCritical = false;
    damageRoll.amountOfDices = numberOfDices;
    roll.nextDice.push(damageRoll);
    roll.roll();
    if (roll.result >= target.ruleCharacter.get(RuleConstants.DEFENCE_TOUCH_AC)) {
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