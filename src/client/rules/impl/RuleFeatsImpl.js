/**
 * Created by LastBerserk on 05.03.2020.
 */

import RuleSkillConstants from "../constants/RuleSkillConstants";

export function axeToGrindImpl(action) {
    // TODO implement map search
    return 1;
}

function makeClassSkill(character, skill) {
    character.get(RuleSkillConstants.CLASS_SKILLS_ARRAY).push(skill);
}

function removeClassSkill(character, skill) {
    const arr = character.get(RuleSkillConstants.CLASS_SKILLS_ARRAY);
    const index = arr.findIndex(item => item === skill);
    if (index !== -1) arr.splice(index, 1);
}

function addValToSkill(character, skill, value) {
    character.set(skill, character.get(skill) + value);
}

export function applyCaretaker(character) {
    makeClassSkill(character, RuleSkillConstants.SKILL_HEAL_RANKS);
    addValToSkill(character, RuleSkillConstants.SKILL_HEAL, 1);
}

export function removeCaretaker(character) {
    removeClassSkill(character, RuleSkillConstants.SKILL_HEAL_RANKS);
    addValToSkill(character, RuleSkillConstants.SKILL_HEAL, -1);
}