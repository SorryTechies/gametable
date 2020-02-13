/**
 * Created by LastBerserk on 21.01.2020.
 */

import RuleActionsConstants from "./RuleConstants";
import RuleCharacterChangesBean from "./RuleCharacterChangesBean";
import StaticController from "../static/StaticController";
import RuleGameObjectConstans from "./constants/RuleGameObjectConstants";

/** @return {GameObject} */
function getObj(id) {
    const obj = StaticController.getObject(id);
    if (obj) {
        return obj;
    } else {
        throw new Error("Cannot find GameObject");
    }
}

export const doMove = action => {
    const obj = getObj(action.performerId);
    obj.position = action.target;
    RuleCharacterChangesBean.addModification(action.performerId, "position", action.target);
};

export const doAttack = action => {
    const obj = getObj(action.target);
    obj.data[RuleGameObjectConstans.LETHAL_DAMAGE] += 1;
    RuleCharacterChangesBean.addDataModification(action.performerId, RuleGameObjectConstans.LETHAL_DAMAGE, obj.data[RuleGameObjectConstans.LETHAL_DAMAGE]);
};