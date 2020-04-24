/**
 * Created by LastBerserk on 02.04.2020.
 */

import * as React from "react";
import StaticController from "../../../static/StaticController";
import StaticViewManager from "../../../popup/StaticViewManager";
import RollCheckView from "../../../popup/views/RollCheckView";

export function handle(message) {
    const key = message.data.key;
    const threshold = message.data.threshold;
    const view = {
        title: "ROLL CHECK", obj: <RollCheckView onClickFunc={() => {
            const char = StaticController.getObjectByCharacter(StaticController.getMyCharacter());
            if (char) {
                const val = char.rollValue(key);
                StaticController.sendRollMessage(char.name, key, val, val >= threshold);
            }
            StaticViewManager.unMount(view);
        }}/>
    };
    setTimeout(() => StaticViewManager.unMount(view), 30000);
    StaticViewManager.addView(view);
}