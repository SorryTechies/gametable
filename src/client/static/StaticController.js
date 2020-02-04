/**
 * Created by LastBerserk on 10.03.2019.
 */

import NormalRequest from "../logic/NormalRequest";
import LoginController from "../logic/LoginController";
import * as WsConstants from "../../common/WsConstants";
import SoundController from "../logic/SoundController";
import RuleCharacter from "../rules/RuleCharacter";

/** @type Account */
let account = null;
let subscribers = [];
let chat = null;
let character = null;
let map = null;
let session = null;
let participants = null;
let music = null;

const LOG_LEVEL = "DEBUG";

export default class StaticController {
    /**
     * @param {Account} acc
     * @return {Promise.<void>}
     */
    static async init(acc) {
        if (!acc) throw new Error("No account provided.");
        account = acc;
        await this.loadSession();
        await this.loadCharacter();
        await this.loadChat();
        await this.loadMap();
        await this.loadParticipants();
        await this.loadMusic();
    }

    static async loadCharacter() {
        if (LoginController.isDM()) return;
        // TODO multiple characters support
        const id = Array.isArray(account.characters_ids) ? account.characters_ids[0]: null;
        if (!id) return;
        character = await new NormalRequest('/character', {id: id}).send();
        character.data = new RuleCharacter(character.data);
    }

    static async loadMap() {
        const id = Array.isArray(session.session_maps_id) ? session.session_maps_id[0]: null;
        if (!id) return;
        map = await new NormalRequest('/map', {id: id}).send();
    }

    static async loadSession() {
        const id = Array.isArray(account.session_ids) ? account.session_ids[0]: null;
        if (!id) return;
        session = await new NormalRequest('/session', {id: id}).send();
        if (!session) throw new Error("Player has no session.");
        LoginController.setSession(session._id);
    }

    static async loadChat() {
        chat = await new NormalRequest('/chat').send();
    }

    static async loadParticipants() {
        participants = await new NormalRequest('/todo').send();
    }

    static async loadMusic() {
        music = await new NormalRequest('/todo').send();
    }

    /** @return RuleCharacter */
    static getCharacter() {
        if (LoginController.isDM()) throw new Error("DM have no stats).");
        return character.data;
    }

    /** @return Array<Account> */
    static getParticipants() {
        return participants;
    }

    /** @return SessionMap */
    static getMap() {
        return map;
    }

    /** @return Array<ChatMessage> */
    static getChat() {
        return chat;
    }

    /** @return {{}} */
    static getMusic() {
        return music;
    }

    static notifySubscribed(id) {
        for (let i = 0; i < subscribers.length; i++) if (subscribers[i].id === id) subscribers[i].func();
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
                SoundController.playNewMessageSound();
                await this.loadChat();
                break;
            case WsConstants.STATIC_MUSIC:
                await this.loadMusic();
                break;
        }
        StaticController.notifySubscribed(id);
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

