/**
 * Created by LastBerserk on 27.02.2020.
 */

import {getTestCharacter, getTestObject} from "../support/RuleTestClasses";
import TestWrapper from "../../TestWrapper";
import RuleConstants from "../../../src/client/rules/RuleConstants";
import * as assert from "assert";

export const CombatBonusTest = TestWrapper.wrap("CombatBonusTest",
    (async () => {
        const CMB = 8;
        const BAB = 6;
        const STR = 14;

        const character = getTestCharacter("char1");
        character.set(RuleConstants.STAT_STRENGTH, STR);
        character.set(RuleConstants.BAB, BAB);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(RuleConstants.COMBAT_MANEUVER_BONUS), CMB);
    })());

export const CombatDefenceTest = TestWrapper.wrap("CombatDefenceTest",
    (async () => {
        const CMD = 13;
        const BAB = 3;
        const STR = 12;
        const DEX = 8;

        const character = getTestCharacter("char1");
        character.set(RuleConstants.STAT_STRENGTH, STR);
        character.set(RuleConstants.STAT_DEXTERITY, DEX);
        character.set(RuleConstants.BAB, BAB);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(RuleConstants.COMBAT_MANEUVER_DEFENCE), CMD);
    })());
