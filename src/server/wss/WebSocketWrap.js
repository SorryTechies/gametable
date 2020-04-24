/**
 * Created by LastBerserk on 01.02.2020.
 */

import WebSocketMessage from "../../common/logic/WebSocketMessage";
import * as WsCharacterDispatcher from "./dispatchers/WsCharacterDispatcher";
import * as WsActionDispatcher from "./dispatchers/WsActionDispatcher";
import * as WsObjectChangeDispatcher from "./dispatchers/WsObjectChangesDispatcher";
import * as WsChatDispatcher from "./dispatchers/WsChatDispatcher";
import * as WsDemandDispatcher from "./dispatchers/WsDemandDispatcher";

const DEFAULT_TIMEOUT = 30 * 1000;
const DELETE_TIMEOUT = DEFAULT_TIMEOUT + 5 * 1000;

export default class WebSocketWrap {
    constructor(ws, id) {
        if (!ws) throw new Error("No ws given.");
        if (!id) throw new Error("No id given.");
        this.ws = ws;
        this.id = id;
        this.ws.user = null;
        this.onDelete = null;
        this.autoCloseTimeout = null;
        this.onAuth = null;
        this.heartbeat();
        this.pingInterval = setInterval(() => this.ws.ping(), DEFAULT_TIMEOUT);
        this.authenticated = false;

        ws.on('pong', () => this.authenticated ? this.heartbeat() : null);

        ws.on('message', async (message) => {
            try {
                const json = WebSocketMessage.fromJson(message);
                if (!this.authenticated && json.type !== WebSocketMessage.TYPE_AUTH) throw new Error("Auth required.");
                switch (json.type) {
                    case (WebSocketMessage.TYPE_AUTH):
                        await this.auth(json);
                        break;
                    case (WebSocketMessage.TYPE_CHAT):
                        return WsChatDispatcher.handleNewChatMessage(json, ws);
                    case (WebSocketMessage.TYPE_INTENT):
                        await WsActionDispatcher.handleNewIntent(json, ws);
                        break;
                    case (WebSocketMessage.TYPE_OBJECT):
                        await WsObjectChangeDispatcher.onGameObjectChange(json.data, ws);
                        break;
                    case (WebSocketMessage.TYPE_CHARACTER):
                        await WsCharacterDispatcher.onCharacterUpdate(json.data, ws);
                        break;
                    case WebSocketMessage.TYPE_ACTION_DEMAND:
                        await WsDemandDispatcher.onDMDemand(json, ws);
                        break;
                    default:
                        throw new Error("Unrecognized message type.");
                }
            } catch (e) {
                console.error("Error message for " + this.id);
                console.error(e);
                const message = new WebSocketMessage(WebSocketMessage.TYPE_ERROR);
                message.json = e.message;
                return ws.send(message.toJson());
            }
        });

        ws.on('close', () => {
            console.log("Connection closed for " + this.id);
            clearTimeout(this.autoCloseTimeout);
            clearInterval(this.pingInterval);
            if (typeof this.onDelete === "function") this.onDelete(this);
        });
    }



    /** @param {WebSocketMessage} json */
    async auth(json) {
        if (typeof this.onAuth === 'function') await this.onAuth(json.data);
        this.authenticated = true;
    }

    terminate() {
        this.ws.terminate();
    }

    heartbeat() {
        clearTimeout(this.autoCloseTimeout);
        this.autoCloseTimeout = setTimeout(this.terminate.bind(this), DELETE_TIMEOUT);
    }
}