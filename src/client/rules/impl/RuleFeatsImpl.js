/**
 * Created by LastBerserk on 05.03.2020.
 */

import {calculateMoveDistance} from "./RuleCommonImpl";

export function axeToGrindImpl(action) {
    // TODO implement map search
    return 1;
}

export function pointBlankShotImpl(action) {
    return calculateMoveDistance(action.performerObject.position, action.targetObject.position) <= 6 ? 1 : 0;
}