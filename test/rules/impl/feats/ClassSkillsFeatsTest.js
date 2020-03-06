/**
 * Created by LastBerserk on 06.03.2020.
 */

import TestWrapper from "../../../TestWrapper";
import {getTestCharacter, getTestObject} from "../../support/RuleTestClasses";
import {applyCaretaker, removeCaretaker} from "../../../../src/client/rules/impl/RuleFeatsImpl";
import * as assert from "assert";
import RuleSkillConstants from "../../../../src/client/rules/constants/RuleSkillConstants";
import RuleFeatsConstants from "../../../../src/client/rules/constants/RuleFeatsConstants";

export const CaretakerApplyTest = TestWrapper.wrap("CaretakerApplyTest",
    (async () => {
        const character = getTestCharacter("char1");
        applyCaretaker(character);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(RuleSkillConstants.CLASS_SKILLS_ARRAY).includes(RuleSkillConstants.SKILL_HEAL_RANKS), true);
        assert.equal(object.get(RuleSkillConstants.SKILL_HEAL), 1);
    })()
);

export const CaretakerRemoveTest = TestWrapper.wrap("CaretakerRemoveTest",
    (async () => {
        const character = getTestCharacter("char1");
        character.feats.push(RuleFeatsConstants.CARETAKER);
        character.set(RuleSkillConstants.CLASS_SKILLS_ARRAY, [RuleSkillConstants.SKILL_HEAL_RANKS]);
        character.set(RuleSkillConstants.SKILL_HEAL, 2);
        removeCaretaker(character);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(RuleSkillConstants.CLASS_SKILLS_ARRAY).includes(RuleSkillConstants.SKILL_HEAL_RANKS), false);
        assert.equal(object.get(RuleSkillConstants.SKILL_HEAL), 1);
    })()
);