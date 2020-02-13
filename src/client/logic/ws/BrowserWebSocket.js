/**
 * Created by LastBerserk on 30.01.2019.
 */

import * as config from "../../../common/config";
import WebSocketMessage from "../../../common/logic/WebSocketMessage";
import * as IntentHandler from "./handlers/IntentHandler";
import LoginController from "../LoginController";
import * as ObjectHandler from "./handlers/ObjectHandler";

let ws = null;
let timeout = null;

const DEFAULT_TIMEOUT = 10 * 1000;

/**
 * @type {[{id: string, func: function}]}
 */
let subscribers = [];

export default class BrowserWebSocket {
    static init(username) {
        const location = window.location.hostname;
        ws = new WebSocket(`ws://${location}:${config.WSS_PORT}`);
        ws.onopen = () => {
            console.log("Ws opened.");
            const message = new WebSocketMessage(WebSocketMessage.TYPE_AUTH);
            message.data = username;
            ws.send(message.toJson());
            if (timeout !== null) {
                clearInterval(timeout);
                subscribers.forEach(obj => obj.func())
            }
        };
        ws.onclose = () => {
            console.log("Ws closed.");
            timeout = setInterval(() => {
                if (ws !== null) {
                    ws.onclose = undefined;
                    ws.close();
                }
                BrowserWebSocket.init(username);
            }, DEFAULT_TIMEOUT);
        };

        ws.onmessage = evt => {
            try {
                const message = WebSocketMessage.fromJson(evt.data);
                switch (message.type) {
                    case WebSocketMessage.TYPE_ERROR:
                        console.error("Error from websocket.");
                        console.error(message.data);
                        return;
                    case WebSocketMessage.TYPE_CHAT:
                        return; //TODO
                    case WebSocketMessage.TYPE_INTENT:
                        switch (message.action) {
                            case "new":
                                return  IntentHandler.handleNewAction(message);
                            case "rem":
                                return IntentHandler.handleRemoveAction(message);
                            case "clear":
                                return IntentHandler.handleClearActions();
                            default:
                                return;
                        }
                    case WebSocketMessage.TYPE_OBJECT:
                        return ObjectHandler.handleObjectChange(message);
                    case WebSocketMessage.TYPE_CHARACTER:
                        return; //TODO
                }
            } catch (e) {
                console.log(e);
            }
        };
    }

    /**
     * @param {WebSocketMessage} message
     */
    static sendMessage(message) {
        if (!ws) throw new Error("Ws isn't open.");
        if (LoginController.getSession()) message.game_id = LoginController.getSession();
        ws.send(message.toJson());
    }

    static subscribe = obj => subscribers.push(obj);

    static closeConnection() {
        ws.onclose = undefined;
        subscribers = [];
        ws.close();
    };

    static unSubscribe(id) {
        const position = subscribers.findIndex(item => item.id === id);
        if (position !== -1) subscribers.splice(position, 1);
    }
}


