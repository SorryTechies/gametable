/**
 * Created by LastBerserk on 10.03.2019.
 */

import NormalRequest from "../logic/NormalRequest";
import LoginController from "../logic/LoginController";
import * as WsConstants from "../../common/WsConstants";
import SoundController from "../logic/SoundController";
import RuleCharacter from "../rules/RuleCharacter";
import RuleRound from "../rules/RuleRound";
import BrowserWebSocket from "../logic/ws/BrowserWebSocket";
import WebSocketMessage from "../../common/logic/WebSocketMessage";
import RuleActions from "../rules/RuleAction";
import RuleCharacterChangesBean from "../rules/RuleCharacterChangesBean";

/** @type Account */
let account = null;
let subscribers = [];
let chat = null;
/** @type Array<RuleCharacter> */
let characters = [];
/** @type RuleCharacter */
let myCharacter = null;
/** @type SessionMap */
let map = null;
/** @type GameSession */
let session = null;
/** @type RuleRound */
let round = null;
/** @type Array<GameObject> */
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
        await this.loadChat();
        await this.loadMap();
        await this.loadObjects();
        await this.loadCharacters();
        await this.setMyCharacter();
        await this.loadActions();
        await this.loadParticipants();
        await this.loadMusic();
    }

    static async loadCharacters() {
        let idArray = objects.map(obj => obj.character_id);
        if (Array.isArray(account.characters_ids)) {
            account.characters_ids.forEach(id => !idArray.includes(id) ? idArray.push(id) : null);
        }
        if (idArray.length > 0) {
            const ans = await new NormalRequest('/character').send({ids: idArray});
            if (ans && Array.isArray(ans.characters)) characters = ans.characters.map(character => {
                const char = new RuleCharacter(character);
                char.recalculate();
                return char;
            });
        }
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
        objects.forEach(obj => !obj.data ? obj.data = {} : null);
    }

    static async loadSession() {
        const id = Array.isArray(account.session_ids) ? account.session_ids[0] : null;
        if (!id) return;
        session = await new NormalRequest('/session', {id: id}).send();
        if (!session) throw new Error("Player has no session.");
        LoginController.setSession(session._id);
        LoginController.setDM(session.owner_id === account._id);
    }

    static reloadActions() {
        round = new RuleRound(objects);
    }

    static async loadActions() {
        this.reloadActions();
        const actions = await new NormalRequest('/round').send();
        if (Array.isArray(actions.round)) actions.round.forEach(action => round.addAction(RuleActions.fromJson(action)));
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

    static setMyCharacter() {
        if (Array.isArray(account.characters_ids)) myCharacter = StaticController.getCharacter(account.characters_ids[0]);
    }

    /** @return RuleCharacter */
    static getMyCharacter() {
        return myCharacter;
    }

    /** @return Account */
    static getAccount() {
        return account;
    }

    static isMyCharacter(character_id) {
        const ids = account.characters_ids;
        return Array.isArray(ids) && ids.includes(character_id);
    }

    /**
     * @param {string} id
     * @return RuleCharacter
     */
    static getCharacter(id) {
        return characters.find(character => character.id === id);
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

    /** @return GameObject */
    static getObject(id) {
        return objects.find(obj => obj._id === id);
    }

    /** @return {RuleRound} */
    static getRound() {
        return round;
    }

    static finishRound() {
        round.finish();
        const message2 = new WebSocketMessage(WebSocketMessage.TYPE_OBJECT);
        message2.data = RuleCharacterChangesBean.beansToJson();
        BrowserWebSocket.sendMessage(message2);
        StaticController.reloadActions();
        const message = new WebSocketMessage(WebSocketMessage.TYPE_INTENT);
        message.action = "clear";
        BrowserWebSocket.sendMessage(message);
        StaticController.notifySubscribed(WebSocketMessage.TYPE_OBJECT);
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

