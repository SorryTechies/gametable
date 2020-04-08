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
import * as RuelDamageToSizeTable from "../table/RuleDamageToSizeTable";

function doAttack(action) {
    /** @type {RuleWeapon} */
    const weapon = action.additional1;
    const damageRoll = new DamageDice();
    damageRoll.bonus = action.performerObject.get(RuleConstants.MOD_DEXTERITY);
    let damageDice;
    if (weapon.isWeapon) {
        damageDice = RuelDamageToSizeTable.getDiceForSize(
            {amount: weapon.amountOfDice, dice: weapon.damageDie},
            action.performerObject.get(RuleConstants.SIZE));
    } else {
        damageDice = RuelDamageToSizeTable.getDiceForSize(
            {amount: 1, dice: 6},
            action.performerObject.get(RuleConstants.SIZE));
    }
    damageRoll.dice = damageDice.dice;
    damageRoll.amountOfDices = damageDice.amount;
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
    doAttack(action);
}