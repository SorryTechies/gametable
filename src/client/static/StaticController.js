/**
 * Created by LastBerserk on 10.03.2019.
 */

import NormalRequest from "../logic/NormalRequest";
import BrowserWebSocket from "../logic/ws/BrowserWebSocket";

let subscribers = [];
const STATIC_CHAR = 'static_char';
const STATIC_CHAT = 'static_chat';
const STATIC_MAP = 'static_map';
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
        BrowserWebSocket.subscribe({id: STATIC_CHAR, func: this.loadCharacter.bind(this)});
        BrowserWebSocket.subscribe({id: STATIC_CHAT, func: this.loadChat.bind(this)});
        BrowserWebSocket.subscribe({id: STATIC_MAP, func: this.loadMap.bind(this)});
    }

    static loadCharacter() {
        const request = new NormalRequest();
        request.path = '/loadCharacter';
        this.character = rethrow(request.send());
    }

    static loadMap() {
        const request = new NormalRequest();
        request.path = '/getMap';
        this.map = rethrow(request.send());
    }

    static loadChat() {
        const request = new NormalRequest();
        request.path = '/loadMessages';
        this.chat = rethrow(request.send());
    }

    static getCharacter() {
        return this.character;
    }

    static getMap() {
        return this.map;
    }

    static getChat() {
        return this.chat;
    }

    update(id) {
        switch (id) {
            case StaticController.CHARACTER:
                return this.loadCharacter();
            case StaticController.MAP:
                return this.loadMap();
            case StaticController.CHAT:
                return this.loadChat();
        }
        for (let i = 0; i < subscribers.length; i++) if (subscribers[i].id === id) subscribers[i].func();
    }

    static subscribe = obj => subscribers.push(obj);

    static unSubscribe(id) {
        const position = subscribers.findIndex(item => item.id === id);
        if (position !== -1) subscribers.splice(position, 1);
    }
}

StaticController.character = null;
StaticController.map = null;
StaticController.chat = null;

StaticController.CHARACTER = "Character";
StaticController.MAP = "Map";
StaticController.CHAT = "Chat";

