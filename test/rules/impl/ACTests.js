/**
 * Created by LastBerserk on 27.02.2020.
 */

import {getTestCharacter, getTestObject} from "../support/RuleTestClasses";
import TestWrapper from "../../TestWrapper";
import RuleConstants from "../../../src/client/rules/RuleConstants";
import * as assert from "assert";

export const FullACTest = TestWrapper.wrap("FullACTest",
    (async () => {
        const DODGE = 2;
        const DEFLECT = 7;
        const ARMOR = 10;

        const AC = 29;
        const TOUCH = 19;
        const FFA = 27;
        const TFFA = 17;

        const character = getTestCharacter("char1");
        character.set(RuleConstants.MODIFIER_DODGE, DODGE);
        character.set(RuleConstants.MODIFIER_DEFLECT, DEFLECT);
        character.set(RuleConstants.MODIFIER_ARMOR, ARMOR);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(RuleConstants.DEFENCE_AC), AC);
        assert.equal(object.get(RuleConstants.DEFENCE_TOUCH_AC), TOUCH);
        assert.equal(object.get(RuleConstants.DEFENCE_FLAT_FOOTED_AC), FFA);
        assert.equal(object.get(RuleConstants.DEFENCE_TFF_AC), TFFA);
    })());
