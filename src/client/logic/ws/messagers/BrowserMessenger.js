/**
 * Created by LastBerserk on 02.04.2020.
 */

import WebSocketMessage from "../../../../common/logic/WebSocketMessage";
import BrowserWebSocket from "../BrowserWebSocket";

export default class BrowserMessenger {
    static sendNewIntentMessage(action) {
        const message = new WebSocketMessage(WebSocketMessage.TYPE_INTENT);
        message.data = action.toJson();
        message.action = "new";
        BrowserWebSocket.sendMessage(message);
    }

    static sendRemIntentMessage(action) {
        const message = new WebSocketMessage(WebSocketMessage.TYPE_INTENT);
        message.data = {
            id: action.id,
            performerId: action.performerId
        };
        message.action = "rem";
        BrowserWebSocket.sendMessage(message);
    }
}