/**
 * Created by LastBerserk on 06.03.2020.
 */

import TestWrapper from "../../../TestWrapper";
import {getTestCharacter, getTestObject} from "../../support/RuleTestClasses";
import {applyCaretaker, removeCaretaker} from "../../../../src/client/rules/impl/RuleFeatsImpl";
import * as assert from "assert";
import SKILLS from "../../../../src/client/rules/constants/RuleSkillConstants";
import RuleFeatsConstants from "../../../../src/client/rules/constants/RuleFeatsConstants";
import * as SUPP from "../../../../src/client/rules/constants/RuleSkillSupportConst";
import CONST from "../../../../src/client/rules/constants/RuleStatConstants";

export const CaretakerApplyTest = TestWrapper.wrap("CaretakerApplyTest",
    (async () => {
        const character = getTestCharacter("char1");
        applyCaretaker(character);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(CONST.CLASS_SKILLS_ARRAY).includes(SUPP.getRankKey(SKILLS.SKILL_HEAL)), true);
        assert.equal(object.get(SKILLS.SKILL_HEAL), 1);
    })()
);

export const CaretakerRemoveTest = TestWrapper.wrap("CaretakerRemoveTest",
    (async () => {
        const character = getTestCharacter("char1");
        character.feats.push(RuleFeatsConstants.CARETAKER);
        character.set(CONST.CLASS_SKILLS_ARRAY, [SKILLS.SKILL_HEAL]);
        character.set(SKILLS.SKILL_HEAL, 2);
        removeCaretaker(character);
        const object = getTestObject(character);
        object.recalculate();

        assert.equal(object.get(CONST.CLASS_SKILLS_ARRAY).includes(SKILLS.SKILL_HEAL), false);
        assert.equal(object.get(SKILLS.SKILL_HEAL), 1);
    })()
);