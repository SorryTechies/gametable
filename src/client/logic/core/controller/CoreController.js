/**
 * Created by LastBerserk on 10.04.2019.
 */

export default class CoreController {
    static init(RulesClass) {
        this.rules = new RulesClass();
        this.rules.init();
    }

    static createCharacter(characterData) {
        const char = this.rules.createCharacter();

    }

    /** @param {Character} characterData */
    static processCharacter(characterData) {
        let core = characterData.core;
        let modifiers = characterData.modifiers;
        if (!core) core = [];
        if (!modifiers) modifiers = [];
        core.forEach(coreValue => CoreController.setCore(coreValue));
        modifiers.forEach(modifier => CoreController.addModifier(modifier));
    };

    static recalculate() {
        CoreController.recalculateAll();
    };
}