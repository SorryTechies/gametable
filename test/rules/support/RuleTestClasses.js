/**
 * Created by LastBerserk on 25.02.2020.
 */


import RuleCharacter from "../../../src/client/rules/RuleCharacter";
import RuleGameObject from "../../../src/client/rules/RuleGameObject";
import RuleActions from "../../../src/client/rules/RuleAction";

/**
 * @param {string} id
 * @return {RuleCharacter}
 */
export const getTestCharacter = id => new RuleCharacter({
    _id: id,
    name: id
});

/**
 *
 * @param {RuleCharacter} char
 * @return {RuleGameObject}
 */
export const getTestObject = char => {
    const object = new RuleGameObject(char.id);
    object.ruleCharacter = char;
    object.character_id = char.id;
    return object;
};

/**
 * @param {string} key
 * @return {RuleAction}
 */
export const getTestAction = key => new RuleActions(key);