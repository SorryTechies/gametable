/**
 * Created by LastBerserk on 30.04.2020.
 */

import LOAD from "../constants/RuleLoadType";
const arr = [
    [3, 6, 10],
    [6, 13, 20],
    [10, 20, 30],
    [13, 26, 40],
    [16, 33, 50],
    [20, 40, 60],
    [23, 46, 70],
    [26, 53, 80],
    [30, 60, 90],
    [33, 66, 100],
    [38, 76, 115],
    [43, 86, 130],
    [50, 100, 150],
    [58, 116, 175],
    [66, 153, 230],
    [76, 153, 230],
    [86, 173, 260],
    [100, 200, 300],
    [116, 233, 350],
    [133, 266, 400],
    [153, 306, 460],
    [173, 346, 520],
    [200, 400, 600],
    [233, 466, 700],
    [266, 533, 800],
    [306, 613, 920],
    [346, 693, 1040],
    [400, 800, 1200],
    [466, 933, 1400]
];

function filterLoad(l) {
    if (l !== -1) {
        return l + 1;
    } else {
        return LOAD.OVER_ENCUMBERED;
    }
}

export function getLoad(weight, strength) {
    if (weight <= 0) return LOAD.NONE;
    if (strength <= 29) {
        return filterLoad(arr[strength - 1].findIndex(t => weight <= t));
    } else {
        const last = parseInt([...strength.toString()].pop());
        if (isNaN(last)) throw new Error("Cannot get last digit.");
        return filterLoad(arr[21 + last].findIndex(t => weight <= t * 4));
    }
}