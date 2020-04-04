/**
 * Created by LastBerserk on 09.03.2020.
 */

import {
    acCheck, touchCheck, flatFootedCheck, flatFootedTouchCheck,
    getRangedAttackRoll, getMeleeAttackImpl, getThrowAttack, getImprovisedAttack
} from "./RuleCommonImpl";
import DamageDice from "../../logic/roll/DamageDice";
import RuleConstants from "../constants/RuleStatConstants";
import RuleACType from "../constants/RuleACType";
import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleGameObjectConstants from "../constants/RuleGameObjectConstants";

function doAttack(action, damage) {
    const damageRoll = new DamageDice();
    damageRoll.bonus = action.performerObject.get(RuleConstants.MOD_DEXTERITY);
    damageRoll.dice = damage ? damage : action.additional1.damageDie;
    damageRoll.amountOfDices = action.additional1.amountOfDice;
    action.roll.nextDice.push(damageRoll);
    action.roll.roll();
    switch (action.additional1.acType) {
        case RuleACType.NORMAL:
            acCheck(action);
            break;
        case RuleACType.TOUCH:
            touchCheck(action);
            break;
        case RuleACType.FLAT_FOOTED:
            flatFootedCheck(action);
            break;
            flatFootedTouchCheck(action);
            break;
    }
    if (action.isSuccessfull) {
        action.targetObject.dealDamage(damageRoll.result, action.additional1.damageType);
        RuleCharacterChangesBean.addDataModification(action.target, RuleGameObjectConstants.LETHAL_DAMAGE, damageRoll.result);
    }
    action.isExecuted = true;
    action.sendDescriptionText();
}

export function simpleRangedImpl(action) {
    action.roll = getRangedAttackRoll(action);
    doAttack(action);
}

export function simpleMeleeAttackImpl(action) {
    action.roll = getMeleeAttackImpl(action);
    doAttack(action);
}

export function simpleThrowAttackImpl(action) {
    action.roll = getThrowAttack(action);
    doAttack(action);
}

export function simpleImprovisedAttackImpl(action) {
    action.roll = getImprovisedAttack(action);
    doAttack(action, 3);
}