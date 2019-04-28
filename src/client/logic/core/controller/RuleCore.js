/**
 * Created by LastBerserk on 28.04.2019.
 */

export default class RuleCore {
    static init() {
    }

    static createCharacter() {
        throw Error("Called abstract method RuleCore:createCharacter. Need to implement.");
    }
}