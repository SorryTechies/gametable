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
let music = null;

const LOG_LEVEL = "DEBUG";

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
        this.loadMusic();
        BrowserWebSocket.subscribe({
            id: WsConstants.STATIC_CHAR,
            func: this.update.bind(this, WsConstants.STATIC_CHAR)
        });
        BrowserWebSocket.subscribe({
            id: WsConstants.STATIC_CHAT,
            func: this.update.bind(this, WsConstants.STATIC_CHAT)
        });
        BrowserWebSocket.subscribe({id: WsConstants.STATIC_MAP, func: this.update.bind(this, WsConstants.STATIC_MAP)});
        BrowserWebSocket.subscribe({
            id: WsConstants.STATIC_MUSIC,
            func: this.update.bind(this, WsConstants.STATIC_MUSIC)
        });
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

    static loadMusic() {
        const request = new NormalRequest();
        request.path = '/getPlaybackStatus';
        music = rethrow(request.send());
    }

    /** @return Promise */
    static getCharacter() {
        if (LoginController.isDM()) {
            return Promise.reject('DM has no character.');
        } else {
            return character;
        }
    }

    /** @return Promise */
    static getParticipants() {
        if (LoginController.isDM()) {
            return participants;
        } else {
            return Promise.reject('Participants for DM only.');
        }
    }

    /** @return Promise */
    static getMap() {
        return map;
    }

    /** @return Promise */
    static getChat() {
        return chat;
    }

    /** @return Promise */
    static getMusic() {
        return music;
    }

    static async update(id) {
        if (LOG_LEVEL === StaticController.VERBOSE) alert("UPDATE: " + id);
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
            case WsConstants.STATIC_MUSIC:
                await this.loadMusic();
                break;
        }
        for (let i = 0; i < subscribers.length; i++) if (subscribers[i].id === id) subscribers[i].func();
    }

    static async saveCharacter(character) {
        const request = new NormalRequest();
        request.path = "/saveCharacter";
        request.method = NormalRequest.METHOD.POST;
        const char = await this.getCharacter();
        request.send(char).then(this.loadCharacter).catch(console.error);
    }

    static subscribe = obj => subscribers.push(obj);

    static unSubscribe(id) {
        const position = subscribers.findIndex(item => item.id === id);
        if (position !== -1) subscribers.splice(position, 1);
    }

    static getLogLevel() {
        return LOG_LEVEL;
    }
}

StaticController.VERBOSE = "VERBOSE";
StaticController.DEBUG = "DEBUG";
StaticController.INFO = "INFO";
StaticController.PROD = "PROD";

