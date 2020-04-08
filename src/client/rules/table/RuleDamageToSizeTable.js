/**
 * Created by LastBerserk on 08.04.2020.
 */

/**
 * @typedef {{}} DamageDiceSup
 * @property {number} amount
 * @property {number} dice
 */

const AMOUNT_ARR = [1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 6, 6, 8, 8, 12, 12, 16];
const DICE_ARR = [1, 2, 3, 4, 6, 8, 10, 6, 8, 6, 8, 6, 8, 6, 8, 6, 8, 6, 8, 6,];

const SIZE_THRESHOLD = 0;
const DAMAGE_THRESHOLD = 5;

/**
 *
 * @param {DamageDiceSup} initialDice
 * @return {number}
 */
function getNormalIndex(initialDice) {
    for (let i = 0; i < AMOUNT_ARR.length; ++i) {
        if (AMOUNT_ARR[i] === initialDice.amount && DICE_ARR[i] === initialDice.dice) return i;
    }
    throw new Error(`Cannot find dice ${initialDice.amount} ${initialDice.dice}`);
}

function getStep(size, index) {
    return size <= SIZE_THRESHOLD || index <= DAMAGE_THRESHOLD ? 1 : 2;
}

/**
 * @param {DamageDiceSup} initialDice
 * @param {number} size
 * @returns {DamageDiceSup}
 */
export function getDiceForSize(initialDice, size) {
    if (size === 0) return initialDice;
    const index = getNormalIndex(initialDice);
    let steps = 0;
    if (size > 0) {
        for (let i = 1; i <= size; ++i) steps += getStep(i, index);
    } else {
        for (let i = -1; i >= size; --i) steps -= getStep(i, index);
    }
    let result = index + steps;
    if (result < 0) result = 0;
    return {amount: AMOUNT_ARR[result], dice: DICE_ARR[result]};
}