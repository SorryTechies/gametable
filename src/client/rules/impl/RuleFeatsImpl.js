/**
 * Created by LastBerserk on 05.03.2020.
 */

import SKILLS from "../constants/RuleSkillConstants";
import CONST from "../constants/RuleStatConstants";

export function axeToGrindImpl(action) {
    // TODO implement map search
    return 1;
}

function makeClassSkill(character, skill) {
    character.get(CONST.CLASS_SKILLS_ARRAY).push(skill);
}

function removeClassSkill(character, skill) {
    const arr = character.get(CONST.CLASS_SKILLS_ARRAY);
    const index = arr.findIndex(item => item === skill);
    if (index !== -1) arr.splice(index, 1);
}

function addValToSkill(character, skill, value) {
    character.set(skill, character.get(skill) + value);
}

export function applyCaretaker(character) {
    makeClassSkill(character, SKILLS.SKILL_HEAL);
    addValToSkill(character, SKILLS.SKILL_HEAL, 1);
}

export function removeCaretaker(character) {
    removeClassSkill(character, SKILLS.SKILL_HEAL);
    addValToSkill(character, SKILLS.SKILL_HEAL, -1);
}