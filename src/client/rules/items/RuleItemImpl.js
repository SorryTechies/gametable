/**
 * Created by LastBerserk on 12.04.2020.
 */

import RuleItemToBuff from "./RuleItemToBuff";
import RuleBuff from "../RuleBuff";
/**
 * @param {RuleGameObject} obj
 * @param {RuleWearable} item
 */
export function equipBuff(obj, item) {
    const onEquipFunc = RuleItemToBuff.onEquip[item.key];
    if (onEquipFunc) {
        const buff = new RuleBuff(item.key);
        buff.setTarget(obj);
        onEquipFunc(buff);
        obj.buffs.addDM(buff);
    }
}

export function unequipBuff(obj, item) {
    obj.buffs.removeDmByKey(item.key);
}