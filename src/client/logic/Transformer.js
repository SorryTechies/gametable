/**
 * Created by LastBerserk on 02.04.2019.
 */

import * as React from "react";
import DiceRoller from "./DiceRoller";
import PopupManager from "../popup/PopupManager";
import rootScss from '../../scss/root.scss';

const MASK = /!!(\d+)d(\d+)([+-]?)(\d*)!!/;
const MASK_TO_SPLIT = /!!\d+d\d+[+-]?\d*!!(.*)/;
function getRollerObject(value) {
    const result = MASK.exec(value);
    let ans = {};
    ans.rollerCount = parseInt(result[1]);
    ans.rollMax = parseInt(result[2]);
    if (result[3]) {
        ans.bonus = result[3] === '-' ? -parseInt(result[4]) : parseInt(result[4]);
        ans.raw = `${result[1]}d${result[2]}${result[3]}${result[4]}`;
        return ans;
    } else {
        ans.bonus = 0;
        ans.raw = `${result[1]}d${result[2]}`;
        return ans;
    }
}

function safeGet(text) {
    try {
        return getRollerObject(text);
    } catch (ignore) {
        return null;
    }
}

export default class Transformer {
    static insertRollTag(text) {
        const parts = [];
        while(true) {
            const obj = safeGet(text);
            if (!obj) break;
            let temp = text.split(MASK_TO_SPLIT, 2);
            text = temp[1];
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
                    onClick={() => PopupManager.push(new DiceRoller(item.rollerCount * item.rollMax).roll(item.bonus).calculatedResult)}
                >
                    {item.raw}
                </div>
            })}
        </div>
    }
}