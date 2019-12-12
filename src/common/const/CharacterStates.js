/**
 * Created by LastBerserk on 01.09.2019.
 */

function createWithDefault(arr, def) {
    return arr.reduce((ans, item) => {
        ans[item] = def;
        return ans;
    }, {});
}

module.exports.MANDATORY_STATES = {
    FIGHTING_DEFENCIVE: "fighting_defencive",
    TOTAL_DEFENCE: "total_defence",
    CHARGE: "charge"
};

module.exports.ACTIVABLE = {
    RAGE: "rage",
    SHIELD: "shield"
};

module.exports.getMandatory = () => createWithDefault(Object.values(module.exports.MANDATORY_STATES), false);
module.exports.getActivable = () => createWithDefault(Object.values(module.exports.ACTIVABLE), false);

/**
 * @param {Character} character
 * @param {string} key
 * @param {boolean} state
 */
module.exports.applyState = (character, key, state) => {
    switch (key) {
        case module.exports.MANDATORY_STATES.TOTAL_DEFENCE:
            if (state) {
                character.defense.AC += 4;
                character.defense.TAC += 4;
            } else {
                character.defense.AC -= 4;
                character.defense.TAC -= 4;
            }
            break;
        case module.exports.MANDATORY_STATES.FIGHTING_DEFENCIVE:
            if (state) {
                character.defense.AC += 2;
                character.defense.TAC += 2;
            } else {
                character.defense.AC -= 2;
                character.defense.TAC -= 2;
            }
            break;
        case module.exports.MANDATORY_STATES.CHARGE:
            if (state) {
                character.defense.AC -= 2;
                character.defense.TAC -= 2;
                character.defense.FFAC -= 2;
                character.defense.FFTAC -= 2;
            } else {
                character.defense.AC += 2;
                character.defense.TAC += 2;
                character.defense.FFAC += 2;
                character.defense.FFTAC += 2;
            }
            break;
    }
};