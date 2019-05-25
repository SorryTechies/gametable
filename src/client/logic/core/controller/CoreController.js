/**
 * Created by LastBerserk on 10.04.2019.
 */

import CoreCharacter from "./CoreCharacter";
import PFRuleCore from "./NewPFCore";

const characters = {};
export default class CoreController {
    static init(RulesClass) {
        this.rules = RulesClass;
        this.rules.init();
    }

    static createCharacter(characterData) {
        const char = this.rules.createCharacter();
        this.processCharacter(char, characterData);
        char.recalculateAll();
        char.printCharacterData();
        return char;
    }

    /**
     * @param {CoreCharacter} character
     * @param {Character} characterData
     */
    static processCharacter(character, characterData) {
        let core = characterData.core;
        let modifiers = characterData.modifiers;
        if (!core) core = [];
        if (!modifiers) modifiers = [];
        core.forEach(coreValue => character.setCore(coreValue));
        modifiers.forEach(modifier => character.addModifier(modifier));
    };

    static recalculate() {
        CoreController.recalculateAll();
    };
}