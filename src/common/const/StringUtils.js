/**
 * Created by LastBerserk on 15.12.2019.
 */

module.exports.intToStr = num => num >= 0 ? "+" + num.toString() : num.toString();
module.exports.diceToStr = (amount, die, bonus) => `${amount}d${die}${module.exports.intToStr(bonus)}`;