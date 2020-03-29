/**
 * Created by LastBerserk on 29.03.2020.
 */

import ChatMessage from "../../common/logic/ChatMessage";
import WebSocketMessage from "../../common/logic/WebSocketMessage";
import BrowserWebSocket from "./ws/BrowserWebSocket";

function strToRGB(str){
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + "00000".substring(0, 6 - c.length) + c;
}

const COLOR_BLACK = "black";

export default class BrowserChatMessage extends ChatMessage {
    constructor() {
        super();
        this.sender = null;
        this.senderName = "";
        this.color = COLOR_BLACK;
        this.isPicture = false;
    }

    init(stat) {
        if (this.senderId) {
            this.sender = stat.getParticipants().find(user => user._id === this.senderId);
            this.color = strToRGB(this.senderId);
        }
        this.senderName = this.sender ? this.sender.username : "system";
        this.isPicture = this.text.startsWith('http');
    }

    send() {
        const message = new WebSocketMessage(WebSocketMessage.TYPE_CHAT);
        message.data = this.toJson();
        BrowserWebSocket.sendMessage(message);
    }

    static fromJson(json, stat) {
        const message = new BrowserChatMessage();
        message.fillFromJson(json);
        message.init(stat);
        return message;
    }
}