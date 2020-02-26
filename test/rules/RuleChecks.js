/**
 * Created by LastBerserk on 25.02.2020.
 */

import {getTestAction, getTestCharacter, getTestObject} from "./support/RuleTestClasses";
import RuleActionsConstants from "../../src/client/rules/constants/RuleActionsConstants";
import {doTotalDefence} from "../../src/client/rules/impl/RuleActionsImplementation";
import RuleConstants from "../../src/client/rules/RuleConstants";
import TestWrapper from "../TestWrapper";
import * as assert from "assert";

export const SimpleCharacterDataTest = TestWrapper.wrap("SimpleCharacterDataTest",
    (async () => {
        const RESULT = 299;

        const character = getTestCharacter("char1");
        character.set(RuleConstants.BAB, RESULT);

        if (character.get(RuleConstants.BAB) !== RESULT)
            throw new Error(`BAB isn't equal ${RESULT}, but was ${character.get(RuleConstants.BAB)}`);
    })());

export const SimpleObjectTest = TestWrapper.wrap("SimpleObjectTest",
    (async () => {
        const RESULT = 199;

        const character = getTestCharacter("char1");
        character.set(RuleConstants.COMBAT_MANEUVER_BONUS, RESULT);
        const object = getTestObject(character);
        object.recalculate();

        if (object.get(RuleConstants.COMBAT_MANEUVER_BONUS) !== RESULT)
            throw new Error(`COMBAT_MANEUVER_BONUS isn't equal ${RESULT}, but was ${object.get(RuleConstants.COMBAT_MANEUVER_BONUS)}`);
    })());

export const FullBuffPlusModifierTest = TestWrapper.wrap("FullBuffPlusModifierTest",
    (async () => {
        const VAL_INCREASE = 2;
        const RESULT = 16;
        const RESULT_2 = 10;

        const character = getTestCharacter("char1");
        character.set(RuleConstants.MODIFIER_DODGE, VAL_INCREASE);
        const object = getTestObject(character);
        const action = getTestAction(RuleActionsConstants.TOTAL_DEFENCE);
        action.setPerformer(object);
        doTotalDefence(action);
        object.recalculate();

        assert.equal(object.get(RuleConstants.DEFENCE_AC), RESULT);
        assert.equal(object.get(RuleConstants.DEFENCE_TOUCH_AC), RESULT);
        assert.equal(object.get(RuleConstants.DEFENCE_FLAT_FOOTED_AC), RESULT_2);
        assert.equal(object.get(RuleConstants.DEFENCE_TFF_AC), RESULT_2);
    })());

export const ALL_TESTS = [
    SimpleCharacterDataTest,
    SimpleObjectTest,
    FullBuffPlusModifierTest
];