/**
 * Created by LastBerserk on 27.02.2020.
 */

import {getTestCharacter, getTestObject} from "../../support/RuleTestClasses";
import TestWrapper from "../../../TestWrapper";
import RuleConstants from "../../../../src/client/rules/RuleConstants";
import * as assert from "assert";

export const SimpleModifierTest = TestWrapper.wrap("SimpleModifierTest",
    (async () => {
        const MOD_STR = 6;
        const STR = 22;

        const character = getTestCharacter("char1");
        character.set(RuleConstants.STAT_STRENGTH, STR);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(RuleConstants.MOD_STRENGTH), MOD_STR);
    })());

export const NegativeModifierTest = TestWrapper.wrap("NegativeModifierTest",
    (async () => {
        const MOD_DEX = -4;
        const DEX = 2;

        const character = getTestCharacter("char1");
        character.set(RuleConstants.STAT_DEXTERITY, DEX);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(RuleConstants.MOD_DEXTERITY), MOD_DEX);
    })());

export const RoundModifierTest = TestWrapper.wrap("RoundModifierTest",
    (async () => {
        const MOD_STR = -2;
        const STR = 7;
        const MOD_DEX = 1;
        const DEX = 13;

        const character = getTestCharacter("char1");
        character.set(RuleConstants.STAT_STRENGTH, STR);
        character.set(RuleConstants.STAT_DEXTERITY, DEX);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(RuleConstants.MOD_STRENGTH), MOD_STR);
        assert.equal(object.get(RuleConstants.MOD_DEXTERITY), MOD_DEX);
    })());
