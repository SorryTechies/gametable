/**
 * Created by LastBerserk on 10.03.2019.
 */

import NormalRequest from "../logic/NormalRequest";
import BrowserWebSocket from "../logic/ws/BrowserWebSocket";
import LoginController from "../logic/LoginController";

let subscribers = [];
let chat = null;
let character = null;
let map = null;
let participants = null;
const STATIC_CHAR = 'static_char';
const STATIC_CHAT = 'static_chat';
const STATIC_MAP = 'static_map';
const STATIC_PARTICIPANTS = 'static_participants';
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
        BrowserWebSocket.subscribe({id: STATIC_CHAR, func: this.loadCharacter.bind(this)});
        BrowserWebSocket.subscribe({id: STATIC_CHAT, func: this.loadChat.bind(this)});
        BrowserWebSocket.subscribe({id: STATIC_MAP, func: this.loadMap.bind(this)});
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

StaticController.CHARACTER = "Character";
StaticController.MAP = "Map";
StaticController.CHAT = "Chat";

