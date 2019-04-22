/**
 * Created by LastBerserk on 17.02.2019.
 */

export default class DiceRoller {
    constructor(type) {
        if (typeof type !== 'number') this.max = 20; else this.max = type;
        this.rollWithoutBonuses = null;
        this.criticalRange = 20;
        this.isCritical = false;
        this.canFail = true;
        this.rollFailed = false;
        this.criticalMultiplier = 1;
        this.nextRoll = null;
        this.canBeCritical = true;
        this.bonus = 0;
    }

    /**
     * Bonus value that added after the roll.
     * @param {number} value
     * @return {DiceRoller}
     */
    setBonus(value) {
        this.bonus = value;
        return this;
    }

    /**
     * Set range value after which roll will be considered critical.
     * @param {number} value
     * @return {DiceRoller}
     */
    setCriticalRange(value) {
        this.criticalRange = value;
        return this;
    }

    /**
     * Set if roll can fail.
     * @param {boolean} value
     * @return {DiceRoller}
     */
    setCanFail(value) {
        this.canFail = value;
        return this;
    }

    /**
     * Set critical multiplier. Which will be applied if roll is critical.
     * @param {number} value
     * @return {DiceRoller}
     */
    setCriticalMultiplier(value) {
        this.criticalMultiplier = value;
        return this;
    }

    /**
     * Set next roll in chain.
     * It will be executed after this one.
     * If this roll is critical, than the next one will be too.
     * @param {DiceRoller} value
     * @return {DiceRoller}
     */
    setNextRoll(value) {
        this.nextRoll = value;
        return this;
    }

    /**
     * Set does this roll can be critical on its own or be chain event.
     * @param {boolean} value
     * @return {DiceRoller}
     */
    setCanBeCritical(value) {
        this.canBeCritical = value;
        return this;
    }

    roll() {
        this.rollWithoutBonuses = Math.round(1 + Math.random() * parseInt(this.max - 1));
        if (this.canBeCritical && (this.max === 20 && this.criticalRange <= this.rollWithoutBonuses)) this.isCritical = true;
        if (this.canFail && this.rollWithoutBonuses === 1) this.rollFailed = true;
        if (this.nextRoll) {
            this.nextRoll.isCritical = this.isCritical;
            this.nextRoll.rollFailed = this.rollFailed;
            this.nextRoll.roll();
        }
        let result = this.rollWithoutBonuses += this.bonus;
        if (this.canBeCritical && this.isCritical) result *= this.criticalMultiplier;
        this.calculatedResult = result;
        return this;
    }

    toString(name) {
        let result;
        let ans;
        if (name) {
            ans = name + " roll ";
        } else {
            ans = "Roll ";
        }
        if (this.canBeCritical && this.isCritical) {
            result = this.calculatedResult + '(critical)';
        } else {
            if (this.canFail && this.rollFailed) {
                result = this.calculatedResult + '(failed)';
            } else {
                result = this.calculatedResult.toString();
            }
        }
        if (this.nextRoll) {
            result += ", next " + this.nextRoll.toString();
        } else {
            result += "."
        }
        return ans + result;
    }
}