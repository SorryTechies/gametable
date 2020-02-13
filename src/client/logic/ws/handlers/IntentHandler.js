/**
 * Created by LastBerserk on 08.02.2020.
 */

import StaticController from "../../../static/StaticController";
import WebSocketMessage from "../../../../common/logic/WebSocketMessage";

function handleNewIntent(message, func) {
    /** @type RuleActions */
    const action = message.data;
    const game_id = message.game_id;
    if (!game_id) throw new Error("No game id provided.");
    if (!action || !action.id || !action.key || !action.performerId) throw new Error("Broken action object.");
    if (typeof func === "function") func(action);
    StaticController.notifySubscribed(WebSocketMessage.TYPE_INTENT);
}

/**
 * @param {WebSocketMessage} message
 */
export function handleNewAction(message) {
    const round = StaticController.getRound();
    handleNewIntent(message, round.addAction.bind(round));
}

/**
 * @param {WebSocketMessage} message
 */
export function handleRemoveAction(message) {
    const round = StaticController.getRound();
    handleNewIntent(message, round.removeAction.bind(round));
}

export function handleClearActions() {
    StaticController.notifySubscribed(WebSocketMessage.TYPE_INTENT);
}