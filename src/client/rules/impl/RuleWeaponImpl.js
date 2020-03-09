/**
 * Created by LastBerserk on 09.03.2020.
 */


import {getAttackRoll} from "./RuleCommonImpl";
import DamageDice from "../../logic/roll/DamageDice";
import RuleConstants from "../RuleConstants";
import * as RuleLoader from "../RuleLoader";
import RuleCharacterChangesBean from "../RuleCharacterChangesBean";
import RuleGameObjectConstans from "../constants/RuleGameObjectConstants";

function getAttackText(action, attackRoll, damage, type) {
    return `${action.performerObject.name} attacks ${action.targetObject.name} ${attackRoll} with ${action.additional1} dealing ${damage} ${type} damage.`;
}

function getMissText(action, attackRoll) {
    return `${action.performerObject.name} attacks ${action.targetObject.name} ${attackRoll} with ${action.additional1} and misses.`;
}

export function improvisedWeaponImpl(action) {

}

export function unarmedImpl(action) {

}

export function laserRifleImpl(action) {
    const attackRoll = getAttackRoll(action, true);
    attackRoll.name = "Attack";
    const damageRoll = new DamageDice();
    damageRoll.canBeCritical = true;
    damageRoll.amountOfDices = 2;
    attackRoll.nextDice.push(damageRoll);
    attackRoll.roll();
    if (attackRoll.result >= action.targetObject.ruleCharacter.get(RuleConstants.DEFENCE_FLAT_FOOTED_AC)) {
        action.targetObject.dealDamage(damageRoll.result);
        RuleLoader.getLoader().sendActionDescription(getAttackText(action, attackRoll.result, "energy"), action);
        RuleCharacterChangesBean.addDataModification(action.target, RuleGameObjectConstans.LETHAL_DAMAGE, damageRoll.result);
    } else {
        RuleLoader.getLoader().sendActionDescription(getMissText(action, attackRoll.result), action);
    }
}