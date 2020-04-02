/**
 * Created by LastBerserk on 02.04.2020.
 */

import StaticController from "../../../static/StaticController";
import BrowserChatMessage from "../../BrowserChatMessage";
import WebSocketMessage from "../../../../common/logic/WebSocketMessage";

export function handle(message) {
    StaticController.pushChatMessage(BrowserChatMessage.fromJson(message, StaticController));
    StaticController.notifySubscribed(WebSocketMessage.TYPE_CHAT);
}