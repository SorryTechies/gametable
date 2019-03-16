/**
 * Created by LastBerserk on 10.03.2019.
 */

import NormalRequest from "../logic/NormalRequest";
import BrowserWebSocket from "../logic/ws/BrowserWebSocket";
import LoginController from "../logic/LoginController";
import * as WsConstants from "../../common/WsConstants";

let subscribers = [];
let chat = null;
let character = null;
let map = null;
let participants = null;

const rethrow = async promise => {
    try {
        return await promise;
    } catch (e) {
        console.error(e);
        return e;
    }
};

export default class StaticController {
    static init() {
        this.loadCharacter();
        this.loadChat();
        this.loadMap();
        this.loadParticipants();
        BrowserWebSocket.subscribe({id: WsConstants.STATIC_CHAR, func: this.update.bind(this, WsConstants.STATIC_CHAR)});
        BrowserWebSocket.subscribe({id: WsConstants.STATIC_CHAT, func: this.update.bind(this, WsConstants.STATIC_CHAT)});
        BrowserWebSocket.subscribe({id: WsConstants.STATIC_MAP, func: this.update.bind(this, WsConstants.STATIC_MAP)});
    }

    static loadCharacter() {
        if (!LoginController.isDM()) {
            const request = new NormalRequest();
            request.path = '/loadCharacter';
            character = rethrow(request.send());
        }
    }

    static loadMap() {
        const request = new NormalRequest();
        request.path = '/getMap';
        map = rethrow(request.send());
    }

    static loadChat() {
        const request = new NormalRequest();
        request.path = '/loadMessages';
        chat = rethrow(request.send());
    }

    static loadParticipants() {
        const request = new NormalRequest();
        request.path = '/getGameParticipants';
        participants = rethrow(request.send());
    }

    static getCharacter() {
        if (LoginController.isDM()) {
            return Promise.reject('DM has no character.');
        } else {
            return character;
        }
    }

    static getParticipants() {
        if (LoginController.isDM()) {
            return participants;
        } else {
            return Promise.reject('Participants for DM only.');
        }
    }

    static getMap() {
        return map;
    }

    static getChat() {
        return chat;
    }

    static async update(id) {
        console.log(`Update from websocket with id '${id}'`);
        switch (id) {
            case WsConstants.STATIC_CHAR:
                await this.loadCharacter();
                break;
            case WsConstants.STATIC_MAP:
                await this.loadMap();
                break;
            case WsConstants.STATIC_CHAT:
                await this.loadChat();
                break;
        }
        for (let i = 0; i < subscribers.length; i++) if (subscribers[i].id === id) subscribers[i].func();
    }

    static subscribe = obj => subscribers.push(obj);

    static unSubscribe(id) {
        const position = subscribers.findIndex(item => item.id === id);
        if (position !== -1) subscribers.splice(position, 1);
    }
}

