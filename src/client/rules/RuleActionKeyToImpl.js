/**
 * Created by LastBerserk on 10.02.2020.
 */

import RuleActionsConstants from "./constants/RuleActionsConstants";
import * as Impl from "./RuleActionsImplementation";

export default {
    [RuleActionsConstants.MOVE]: Impl.doMove,
    [RuleActionsConstants.ATTACK]: Impl.doAttack
};