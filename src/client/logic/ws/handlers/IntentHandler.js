/**
 * Created by LastBerserk on 08.02.2020.
 */

import StaticController from "../../../static/StaticController";
import WebSocketMessage from "../../../../common/logic/WebSocketMessage";

/**
 * @param {WebSocketMessage} message
 */
export function handleNewAction(message) {
    /** @type RuleActions */
    const action = message.data;
    const game_id = message.game_id;
    if (!game_id) throw new Error("No game id provided.");
    if (!action || !action.id || !action.key || !action.performerId) throw new Error("Broken action object.");
    StaticController.getRound().addAction(action);
    StaticController.notifySubscribed(WebSocketMessage.TYPE_INTENT);
}

/**
 * @param {WebSocketMessage} message
 */
export function handleRemoveAction(message) {
    /** @type RuleActions */
    const action = message.data;
    const game_id = message.game_id;
    if (!game_id) throw new Error("No game id provided.");
    if (!action || !action.id) throw new Error("Broken action object.");
    StaticController.getRound().removeAction(action);
    StaticController.notifySubscribed(WebSocketMessage.TYPE_INTENT);
}