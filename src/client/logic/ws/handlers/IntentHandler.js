/**
 * Created by LastBerserk on 08.02.2020.
 */

import StaticController from "../../../static/StaticController";
import WebSocketMessage from "../../../../common/logic/WebSocketMessage";
import RuleActions from "../../../rules/RuleAction";

function handleNewIntent(message, func) {
    /** @type RuleActions */
    const action = message.data;
    const game_id = message.game_id;
    if (!game_id) throw new Error("No game id provided.");
    switch (message.action) {
        case "new":
            if (!action || !action.id || !action.key || !action.performerId) throw new Error("Broken action object.");
            break;
        case "rem":
            if (!action || !action.id) throw new Error("Broken action object.");
            break;
    }
    if (typeof func === "function") func(action);
    StaticController.notifySubscribed(WebSocketMessage.TYPE_INTENT);
}

/**
 * @param {WebSocketMessage} message
 */
export function handleNewAction(message) {
    const round = StaticController.getRound();
    handleNewIntent(message, json => round.addAction(RuleActions.fromJson(json)));
}

/**
 * @param {WebSocketMessage} message
 */
export function handleRemoveAction(message) {
    const round = StaticController.getRound();
    handleNewIntent(message, round.removeAction.bind(round));
}

export function handleClearActions() {
    StaticController.reloadActions();
    StaticController.notifySubscribed(WebSocketMessage.TYPE_INTENT);
}