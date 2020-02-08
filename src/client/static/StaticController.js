/**
 * Created by LastBerserk on 10.03.2019.
 */

import NormalRequest from "../logic/NormalRequest";
import LoginController from "../logic/LoginController";
import * as WsConstants from "../../common/WsConstants";
import SoundController from "../logic/SoundController";
import RuleCharacter from "../rules/RuleCharacter";
import RuleRound from "../rules/RuleRound";

/** @type Account */
let account = null;
let subscribers = [];
let chat = null;
/** @type RuleCharacter */
let character = null;
/** @type SessionMap */
let map = null;
/** @type GameSession */
let session = null;
/** @type RuleRound */
let round = null;
let objects = [];
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
        await this.loadObjects();
        await this.loadActions();
        await this.loadParticipants();
        await this.loadMusic();
    }

    static async loadCharacter() {
        if (LoginController.isDM()) return;
        // TODO multiple characters support
        const id = Array.isArray(account.characters_ids) ? account.characters_ids[0] : null;
        if (!id) return;
        character = new RuleCharacter(await new NormalRequest('/character', {id: id}).send());
    }

    static async loadMap() {
        const id = Array.isArray(session.session_maps_id) ? session.session_maps_id[0] : null;
        if (!id) return;
        map = await new NormalRequest('/map', {id: id}).send();
    }

    static async loadObjects() {
        const idArray = Array.isArray(map.map_objects_id) ? map.map_objects_id : [];
        const request = new NormalRequest('/object');
        request.method = NormalRequest.METHOD.POST;
        objects = (await request.send({ids: idArray})).objects;
    }

    static async loadSession() {
        const id = Array.isArray(account.session_ids) ? account.session_ids[0] : null;
        if (!id) return;
        session = await new NormalRequest('/session', {id: id}).send();
        if (!session) throw new Error("Player has no session.");
        LoginController.setSession(session._id);
        LoginController.setDM(session.owner_id === account._id);
    }

    static async loadActions() {
        round = new RuleRound(objects);
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

    /** @return Account */
    static getAccount() {
        return account;
    }

    static isMyCharacter(character_id) {
        const ids = account.characters_ids;
        return Array.isArray(ids) && ids.includes(character_id);
    }

    /** @return RuleCharacter */
    static getCharacter() {
        if (LoginController.isDM()) throw new Error("DM have no stats).");
        return character;
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

    /** @return {Array<GameObject>} */
    static getObjects() {
        return objects;
    }

    /** @return {RuleRound} */
    static getRound() {
        return round;
    }

    /**
     * @param {GameObject} unit
     * @return {boolean}
     */
    static isOwnedGameObject(unit) {
        if (!unit) throw new Error("No GameObject unit.");
        return unit.character_id && account.characters_ids.includes(unit.character_id);
    }

    static notifySubscribed(id) {
        for (let i = 0; i < subscribers.length; i++) if (subscribers[i].id === id) subscribers[i].func();
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

