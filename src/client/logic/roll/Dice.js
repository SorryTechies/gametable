/**
 * Created by LastBerserk on 15.12.2019.
 */

export default class Dice {
    constructor() {
        this.name = "";
        this.textResult = "";
        this.die = 6;
        this.rawResult = 0;
        this.bonus = 0;
        this.result = 0;
        this.nextDice = [];
        this.prevRoll = null;
    }

    roll() {
        this.simpleRoll();
        this.rollNext();
        this.generateText();
        return this;
    }

    simpleRoll() {
        this.rawResult = Dice.rollFunc(this.die);
        this.result = this.rawResult + this.bonus;
    }

    rollNext() {
        this.nextDice.forEach(dice => {
            dice.prevRoll = this;
            dice.roll();
        });
    }

    generateForThisDice() {
        return `${this.name} roll ${this.result}`;
    }

    generateText() {
        return this.nextDice.reduce((acc, dice) => acc + ' ' + dice.generateText(), this.generateForThisDice());
    }
}

Dice.rollFunc = die => Math.round(1 + Math.random() * parseInt(die - 1));