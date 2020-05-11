/**
 * Created by LastBerserk on 09.03.2020.
 */

import {
    acCheck, touchCheck, flatFootedCheck, flatFootedTouchCheck,
} from "./RuleCommonImpl";
import DamageDice from "../../logic/roll/DamageDice";
import RuleConstants from "../constants/RuleStatConstants";
import RuleACType from "../constants/RuleACType";
import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleGameObjectConstants from "../constants/RuleGameObjectConstants";
import * as RuleDamageToSizeTable from "../table/RuleDamageToSizeTable";
import ACTION from "../constants/RuleActionsConstants";
import FEATS from "../constants/RuleFeatsConstants";
import * as AttackImpl from "./RuleAttackImpl";
import {pointBlankShotImpl} from "./RuleFeatsImpl";
import STATS from "../constants/RuleStatConstants";

function adjustDamageBonus(action, damageRoll) {
    /** @type {RuleWeapon} */
    const weapon = action.additional1;
    const character = action.performerObject.ruleCharacter;
    if (!weapon.isRanged) damageRoll.bonus = action.performerObject.get(RuleConstants.MOD_STRENGTH);
    damageRoll.bonus += action.performerObject.get(RuleConstants.MODIFIER_DAMAGE);
    if (action.key === ACTION.THROW_ATTACK) {
        if (character.hasFeat(FEATS.POINT_BLANK_SHOT)) damageRoll.bonus += pointBlankShotImpl(action);
        if (character.hasFeat(FEATS.STARTOSS_STYLE)) {
            damageRoll.bonus += 4;
            if (character.hasFeat(FEATS.STARTOSS_COMET)) damageRoll.bonus += 2;
            if (character.hasFeat(FEATS.STARTOSS_SHOWER)) damageRoll.bonus += 2;
        }
    }
}

function doAttack(action) {
    /** @type {RuleWeapon} */
    const weapon = action.additional1;
    const damageRoll = new DamageDice();
    damageRoll.bonus = action.performerObject.get(STATS.MODIFIER_DAMAGE);
    adjustDamageBonus(action, damageRoll);
    let damageDice;
    if (weapon.isWeapon) {
        damageDice = RuleDamageToSizeTable.getDiceForSize(
            {amount: weapon.amountOfDice, dice: weapon.damageDie},
            action.performerObject.get(RuleConstants.SIZE));
    } else {
        damageDice = RuleDamageToSizeTable.getDiceForSize(
            RuleDamageToSizeTable.getImprovisedDieFromWeight(weapon.weight),
            action.performerObject.get(RuleConstants.SIZE));
    }
    damageRoll.die = damageDice.dice;
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
        case RuleACType.FF_TOUCH:
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
    action.roll = AttackImpl.getRangedAttackRoll(action);
    doAttack(action);
}

export function simpleMeleeAttackImpl(action) {
    action.roll = AttackImpl.getMeleeAttackImpl(action);
    doAttack(action);
}

export function simpleThrowAttackImpl(action) {
    action.roll = AttackImpl.getThrowAttack(action);
    doAttack(action);
}

export function simpleImprovisedAttackImpl(action) {
    action.roll = AttackImpl.getImprovisedAttack(action);
    doAttack(action);
}