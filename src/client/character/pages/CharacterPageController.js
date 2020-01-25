/**
 * Created by LastBerserk on 25.01.2020.
 */

import PopupManager from "../../popup/PopupManager";
import CheckDice from "../../logic/roll/CheckDice";
import StaticController from "../../static/StaticController";

export default class CharacterPageController {
    static getRollPop(obj, char) {
        return () => {
            const roller = new CheckDice();
            roller.name = obj.stat;
            roller.bonus = char.get(obj.mod);
            PopupManager.push(roller.roll().generateText());
        };
    }

    static saveCharacter(character, key) {
        return value => {
            const v = parseInt(value);
            if (isNaN(v)) return;
            character.setOriginal(key, v);
            character.recalculate();
            StaticController.saveCharacter();
        };
    }
}