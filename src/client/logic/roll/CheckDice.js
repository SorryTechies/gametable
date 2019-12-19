/**
 * Created by LastBerserk on 15.12.2019.
 */

const intToStr = require("../../../common/const/StringUtils").intToStr;

import Dice from "./Dice";

export default class CheckDice extends Dice {
    constructor() {
        super();
        this.die = 20;
        this.critical = false;
        this.failed = false;
    }

    roll() {
        this.simpleRoll();
        if (this.rawResult === 20) this.critical = true;
        if (this.rawResult === 1) this.failed = true;
        this.rollNext();
        return this;
    }

    generateForThisDice() {
        let status = "";
        if (this.critical) status = " critical";
        if (this.failed) status = " failed";
        return `${this.name} roll ${this.result}(${this.rawResult}${intToStr(this.bonus)})${status}`;
    }
}