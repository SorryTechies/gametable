/**
 * Created by LastBerserk on 15.12.2019.
 */
import RuleDamageType from "../../rules/constants/RuleDamageType";

const diceToStr = require("../../../common/const/StringUtils").diceToStr;

import Dice from "./Dice";
import TranslationModule from "../../rules/translation/TranslationModule";

function fullFormula(self) {
    let result = self.result;
    for (let i = 0; i < self.criticalModifier; i++) {
        self.simpleRoll();
        result += self.result;
    }
    return result;
}

function newFormula(self) {
    return self.result + self.die * self.amountOfDices * self.criticalModifier;
}

export default class DamageDice extends Dice {
    constructor() {
        super();
        this.canBeCritical = true;
        this.criticalModifier = 2;
        this.amountOfDices = 1;
        this.damageType = RuleDamageType.BLUDGEONING;
    }

    simpleRoll() {
        this.rawResult = 0;
        for (let i = 0; i < this.amountOfDices; i++) this.rawResult += Dice.rollFunc(this.die);
        this.result = this.rawResult + this.bonus;
    }

    roll() {
        if (this.prevRoll && this.prevRoll.critical && this.canBeCritical) {
            if (DamageDice.USE_FULL_CRIT_FORMULA) {
                this.result = fullFormula(this);
            } else {
                this.result = newFormula(this);
            }
        } else {
            this.simpleRoll();
        }
        this.rollNext();
        return this;
    }

    getDamageType() {
        return TranslationModule.getDamageTypeTranslation(this.damageType);
    }

    rollText() {
        return `${this.name} ${this.result} ( ${this.amountOfDices}d${this.die}${this.getBonusText()} ${this.getDamageType()} )`;
    }

    generateForThisDice() {
        return `${this.name} ${this.result}(${diceToStr(this.amountOfDices, this.die, this.bonus)})`;
    }
}

DamageDice.USE_FULL_CRIT_FORMULA = false;