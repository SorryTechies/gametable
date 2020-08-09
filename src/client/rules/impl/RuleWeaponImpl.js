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
import RuleWeaponTags from "../constants/RuleWeaponTags";
import RuleDamageType from "../constants/RuleDamageType";
import RuleWeapon from "../items/RuleWeapon";

function flamingWeaponImpl(action) {
    const flamingRoll = new DamageDice();
    flamingRoll.damageType = RuleDamageType.FIRE;
    flamingRoll.name = "Flaming Weapon";
    flamingRoll.canBeCritical = false;
    action.roll.nextDice.push(flamingRoll);
}

function adjustDamageBonus(action, damageRoll) {
    /** @type {RuleWeapon} */
    const weapon = action.additional1;
    const character = action.performerObject.ruleCharacter;
    let strBonus = action.performerObject.get(RuleConstants.MOD_STRENGTH);
    if (action.isTwoHanded) strBonus = Math.floor(1.5 * strBonus);
    if (!weapon.isRanged) damageRoll.bonus = strBonus;
    damageRoll.bonus += action.performerObject.get(RuleConstants.MODIFIER_DAMAGE);
    if (action.key === ACTION.THROW_ATTACK) {
        if (character.hasFeat(FEATS.POINT_BLANK_SHOT)) damageRoll.bonus += pointBlankShotImpl(action);
        if (character.hasFeat(FEATS.STARTOSS_STYLE)) {
            damageRoll.bonus += 4;
            if (character.hasFeat(FEATS.STARTOSS_COMET)) damageRoll.bonus += 2;
            if (character.hasFeat(FEATS.STARTOSS_SHOWER)) damageRoll.bonus += 2;
        }
    }

    // WEAPON EFFECTS IMPL
    if (weapon.hasTag(RuleWeaponTags.FLAMING)) flamingWeaponImpl(action);
}

function doAttack(action) {
    if (!action.additional1) action.additional1 = RuleWeapon.generateUnarmed(action.performerObject);
    /** @type {RuleWeapon|RuleItem} */
    const weapon = action.additional1;
    const damageRoll = new DamageDice();
    action.roll.nextDice.push(damageRoll);
    damageRoll.bonus = action.performerObject.get(STATS.MODIFIER_DAMAGE);
    damageRoll.name = weapon.key;
    adjustDamageBonus(action, damageRoll);
    let damageDice;
    if (weapon.isWeapon) {
        damageRoll.damageType = weapon.damageType;
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
    action.roll.roll();
    action.isSuccessfull = action.roll.passed(action.targetObject);
    if (action.isSuccessfull) action.roll.nextDice.forEach(dd => action.targetObject.dealDamage(dd.result, dd.damageType));
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