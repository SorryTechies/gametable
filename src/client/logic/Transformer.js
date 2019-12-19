/**
 * Created by LastBerserk on 02.04.2019.
 */

import * as React from "react";
import DiceRoller from "./DiceRoller";
import PopupManager from "../popup/PopupManager";
import rootScss from '../../scss/root.scss';
import CheckDice from "./roll/CheckDice";
import DamageDice from "./roll/DamageDice";

const MASK = /!!(\d+)d(\d+)([+-]?)(\d*)((?:\(\d*\))?)(x\d+)?(\[.+])?!!/;
const MASK_TO_SPLIT = /!!(\d+)d(\d+)([+-]?)(\d*)((?:\(\d*\))?)(x\d+)?(\[.+])?!!(.*)/;
function getRollerObject(value) {
    const result = MASK.exec(value);
    return getRollDataFromExecResult(result);
}

function getRollDataFromExecResult(result) {
    let ans = {};
    ans.rollerCount = parseInt(result[1]);
    ans.rollMax = parseInt(result[2]);
    if (result[3]) {
        ans.bonus = result[3] === '-' ? -parseInt(result[4]) : parseInt(result[4]);
        ans.raw = `${result[1]}d${result[2]}${result[3]}${result[4]}`;
    } else {
        ans.bonus = 0;
        ans.raw = `${result[1]}d${result[2]}`;
    }
    if (result[5]) {
        ans.raw += result[5];
        ans.critRange = result[5].substr(1, result[5].length - 2);
    }
    if (result[6]) {
        ans.raw += result[6];
        ans.critMultiplier = result[6].substr(1, result[6].length - 1);
    }
    if (result[7]) {
        try {
            ans.nextRoll = getRollerObject("!!" + result[7].substr(1, result[7].length - 2) + "!!");
            ans.raw += '[' + ans.nextRoll.raw + ']';
        } catch (ignore) {
        }
    }
    return ans;
}

function safeGet(text) {
    try {
        return getRollerObject(text);
    } catch (ignore) {
        return null;
    }
}

function createDice(item, displayName) {
    let roller;
    if (item.rollMax === 20) {
        roller = new CheckDice();
        roller.critRange = item.critRange;
    } else {
        roller = new DamageDice();
        roller.die = item.rollMax;
        roller.amountOfDices = item.rollerCount;
        roller.criticalModifier = item.critMultiplier;
    }
    roller.name = displayName;
    roller.bonus = item.bonus;
    if (item.nextRoll) {
        roller.nextDice = [createDice(item.nextRoll, "")];
    }
    return roller;
}

function displayRoll(item, displayName) {
    PopupManager.push(createDice(item, displayName).roll().generateText());
}

export default class Transformer {
    static insertRollTag(text, displayName) {
        const parts = [];
        while (true) {
            const obj = safeGet(text);
            if (!obj) {
                parts.push(text);
                break;
            }
            let temp = text.split(MASK_TO_SPLIT);
            text = temp[8];
            parts.push(temp[0]);
            parts.push(obj);
        }
        if (parts.length === 0) parts.push(text);
        return <div className={rootScss.description_with_inject}>
            {parts.map((item, index) => {
                if (typeof item === "string") return item;
                return <div
                    className={rootScss.injected_roller}
                    key={index}
                    onClick={displayRoll.bind(null, item, displayName)}>
                    {item.raw}
                </div>
            })}
        </div>
    }
}