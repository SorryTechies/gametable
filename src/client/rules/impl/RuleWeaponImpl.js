/**
 * Created by LastBerserk on 09.03.2020.
 */


import {getAttackRoll} from "./RuleCommonImpl";
import DamageDice from "../../logic/roll/DamageDice";
import RuleConstants from "../constants/RuleStatConstants";
import * as RuleLoader from "../RuleLoader";
import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleGameObjectConstants from "../constants/RuleGameObjectConstants";
import RuleDamageType from "../constants/RuleDamageType";
import TranslationModule from "../translation/TranslationModule";
import RuleTranslationConstants from "../constants/RuleTranslationConstants";

function getAttackText(action, attackRoll, damage, type) {
    return TranslationModule.getTranslation(
        RuleTranslationConstants.ATTACK_HIT,
        action.performerObject.name,
        action.targetObject.name,
        attackRoll,
        action.additional1,
        damage,
        type
    );
}

function getMissText(action, attackRoll) {
    return TranslationModule.getTranslation(
        RuleTranslationConstants.ATTACK_MISS,
        action.performerObject.name,
        action.targetObject.name,
        attackRoll,
        action.additional1
    );
}

function simpleMeleeAttack(action, dmgDice = 6) {
    const attackRoll = getAttackRoll(action, false);
    const damageRoll = new DamageDice();
    damageRoll.bonus = action.performerObject.get(RuleConstants.MOD_STRENGTH);
    damageRoll.dice = dmgDice;
    attackRoll.nextDice.push(damageRoll);
    attackRoll.roll();
    let str;
    if (attackRoll.result >= action.targetObject.get(RuleConstants.DEFENCE_AC)) {
        action.targetObject.dealDamage(damageRoll.result);
        str = getAttackText(action, attackRoll.result, damageRoll.result);
        RuleCharacterChangesBean.addDataModification(action.target, RuleGameObjectConstants.LETHAL_DAMAGE, damageRoll.result);
    } else {
        str = getMissText(action, attackRoll.result);
    }
    RuleLoader.getLoader().sendActionDescription(str, action);
}

export function improvisedWeaponImpl(action) {
    simpleMeleeAttack(action);
}

export function unarmedImpl(action) {
    simpleMeleeAttack(action, 3);
}

export function laserRifleImpl(action) {
    const attackRoll = getAttackRoll(action, true);
    const damageRoll = new DamageDice();
    damageRoll.amountOfDices = 2;
    attackRoll.nextDice.push(damageRoll);
    attackRoll.roll();
    let str;
    if (attackRoll.result >= action.targetObject.get(RuleConstants.DEFENCE_FLAT_FOOTED_AC)) {
        action.targetObject.dealDamage(damageRoll.result, RuleDamageType.ENERGY);
        str = getAttackText(action, attackRoll.result, damageRoll.result, RuleDamageType.ENERGY);
        RuleCharacterChangesBean.addDataModification(action.target, RuleGameObjectConstants.LETHAL_DAMAGE, damageRoll.result);
    } else {
        str = getMissText(action, attackRoll.result);
    }
    RuleLoader.getLoader().sendActionDescription(str, action);
}

export function spearImpl(action) {
    simpleMeleeAttack(action);
}