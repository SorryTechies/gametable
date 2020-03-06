/**
 * Created by LastBerserk on 27.02.2020.
 */

import {getTestCharacter, getTestObject} from "../../support/RuleTestClasses";
import TestWrapper from "../../../TestWrapper";
import RuleConstants from "../../../../src/client/rules/RuleConstants";
import * as assert from "assert";
import RuleSkillConstants from "../../../../src/client/rules/constants/RuleSkillConstants";

export const SimpleSkillTest = TestWrapper.wrap("SimpleSkillTest",
    (async () => {
        const ACROB = 3;
        const RANKS = 1;
        const DEX = 14;

        const character = getTestCharacter("char1");
        character.set(RuleSkillConstants.SKILL_ACROBATICS_RANKS, RANKS);
        character.set(RuleConstants.STAT_DEXTERITY, DEX);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(RuleSkillConstants.SKILL_ACROBATICS), ACROB);
    })());

export const ClassSkillTest = TestWrapper.wrap("ClassSkillTest",
    (async () => {
        const CLIMB = 6;
        const RANKS = 1;
        const STR = 16;

        const character = getTestCharacter("char1");
        character.set(RuleSkillConstants.SKILL_CLIMB_RANKS, RANKS);
        character.set(RuleConstants.STAT_STRENGTH, STR);
        character.get(RuleSkillConstants.CLASS_SKILLS_ARRAY).push(RuleSkillConstants.SKILL_CLIMB_RANKS);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(RuleSkillConstants.SKILL_CLIMB), CLIMB);
    })());