/**
 * Created by LastBerserk on 06.03.2020.
 */

import TestWrapper from "../../../TestWrapper";
import {getTestAction, getTestCharacter, getTestObject} from "../../support/RuleTestClasses";
import * as assert from "assert";
import RuleConstants from "../../../../src/client/rules/constants/RuleStatConstants";
import RuleState from "../../../../src/client/rules/RuleState";
import RuleActionsConstants from "../../../../src/client/rules/constants/RuleActionsConstants";
import RuleBuffConstants from "../../../../src/client/rules/constants/RuleBuffConstants";

export const CombatExpertiseSimpleTest = TestWrapper.wrap("CombatExpertiseSimpleTest",
    (async () => {
        const character = getTestCharacter("char1");
        const object = getTestObject(character);
        const action = getTestAction(RuleActionsConstants.ACTIVATE_STATE);
        action.setPerformer(object);
        action.additional1 = RuleBuffConstants.FIGHTING_DEFENSIVELY;
        RuleState.activateCombatExpertise(action);
        object.recalculate();

        assert.equal(object.get(RuleConstants.DEFENCE_AC), 11);
        assert.equal(object.get(RuleConstants.ATTACK_FLAT), -1);
        assert.equal(object.get(RuleConstants.COMBAT_MANEUVER_BONUS), -1);
    })()
);