/**
 * Created by LastBerserk on 21.01.2020.
 */

import RuleConstants from "../RuleConstants";
import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleGameObjectConstans from "../constants/RuleGameObjectConstants";
import CheckDice from "../../logic/roll/CheckDice";
import DamageDice from "../../logic/roll/DamageDice";

function getStrAttackRoll(character) {
    const roll = new CheckDice();
    roll.bonus = character.get(RuleConstants.BAB) + character.get(RuleConstants.MOD_STRENGTH);
    return roll;
}

export const doMove = action => {
    action.performerObject.position = action.target;
    RuleCharacterChangesBean.addModification(action.performerId, "position", action.target);
};

export const doAttack = action => {
    const obj = action.targetObject;
    obj.data[RuleGameObjectConstans.LETHAL_DAMAGE] += 1;
    RuleCharacterChangesBean.addDataModification(action.performerId, RuleGameObjectConstans.LETHAL_DAMAGE, obj.data[RuleGameObjectConstans.LETHAL_DAMAGE]);
};

export const doShockGrasp = action => {
    const target = action.targetObject;
    const performer = action.performerObject;
    const perfCharacter = performer.gameObject;
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
    if (roll.result >= target.gameObject.get(RuleConstants.DEFENCE_TOUCH_AC)) {
        target.data[RuleGameObjectConstans.LETHAL_DAMAGE] += damageRoll.result;
        RuleCharacterChangesBean.addDataModification(action.target, RuleGameObjectConstans.LETHAL_DAMAGE, target.data[RuleGameObjectConstans.LETHAL_DAMAGE]);
    }
};