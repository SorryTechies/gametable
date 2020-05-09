/**
 * Created by LastBerserk on 10.03.2019.
 */

import NormalRequest from "../logic/NormalRequest";
import LoginController from "../logic/LoginController";
import RuleCharacter from "../rules/RuleCharacter";
import RuleRound from "../rules/RuleRound";
import BrowserWebSocket from "../logic/ws/BrowserWebSocket";
import WebSocketMessage from "../../common/logic/WebSocketMessage";
import RuleActions from "../rules/RuleAction";
import RuleCharacterChangesBean from "../rules/RuleCharacterChangesBean";
import RuleGameObject from "../rules/RuleGameObject";
import * as RuleLoader from "../rules/RuleLoader";
import TranslationModule from "../rules/translation/TranslationModule";
import SupportedLanguages from "../rules/translation/SupportedLanguages";
import BrowserChatMessage from "../logic/BrowserChatMessage";
import RuleConstants from "../rules/constants/RuleSkillConstants";
import RuleMap from "../rules/map/RuleMap";
import BadArgumentsError from "../../common/type/BadArgumentsError";

/** @type {AccountBean} */
let account = null;
/** @type {AccountBean} */
let dm = null;
let subscribers = [];
/** @type Array<ChatMessage> */
let chat = [];
/** @type Array<RuleCharacter> */
let characters = [];
/** @type RuleCharacter */
let myCharacter = null;
/** @type {RuleMap} */
let map = null;
/** @type GameSession */
let session = null;
/** @type RuleRound */
let round = null;
/** @type Array<RuleGameObject> */
let objects = [];
let participants = [];
let music = null;

function linkCharacters() {
    dm = participants.find(acc => acc._id === session.owner_id);
    objects.forEach(obj => {
        const char = characters.find(char => obj.character_id === char.id);
        if (!char) throw new Error("Cannot find character for object.");
        obj.ruleCharacter = char;
        const owner = participants.find(acc => acc.characters_ids.includes(char.id));
        if (owner) {
            obj.owner = owner;
            if (!Array.isArray(owner.characters)) owner.characters = [];
            owner.characters.push(owner);
        }
        obj.buffs.mountBuffs();
        obj.recalculate();
    });
}

/**
 * @param {string} text
 * @param {Array.<string>} toWho
 * @return {BrowserChatMessage}
 */
function getMessage(text, toWho = []) {
    const chatMessage = new BrowserChatMessage();
    chatMessage.text = text;
    chatMessage.targets = toWho;
    chatMessage.sessionId = session._id;
    chatMessage.senderId = account._id;
    chatMessage.init(StaticController);
    return chatMessage;
}

function pushMessage(message) {
    chat.unshift(message);
}

export default class StaticController {
    /**
     * @param {AccountBean} acc
     * @return {Promise.<void>}
     */
    static async init(acc) {
        if (!acc) throw new Error("No account provided.");
        account = acc;
        await this.loadSession();
        await this.loadParticipants();
        await this.loadChat();
        await this.loadMap();
        await this.loadObjects();
        await this.loadCharacters();
        await this.setMyCharacter();
        linkCharacters();
        await this.loadActions();
        await this.loadMusic();
    }

    static reinit() {
        StaticController.init(account);
        for (let i = 0; i < subscribers.length; i++) subscribers[i].func();
    }

    static async loadCharacters() {
        let idArray = objects.map(obj => obj.character_id);
        if (Array.isArray(account.characters_ids)) {
            account.characters_ids.forEach(id => !idArray.includes(id) ? idArray.push(id) : null);
        }
        if (idArray.length > 0) {
            const ans = await new NormalRequest('/character').send({ids: idArray});
            if (ans && Array.isArray(ans.characters)) {
                characters = ans.characters.map(character => new RuleCharacter(character));
            }
        }
    }

    static async loadMap() {
        const id = Array.isArray(session.session_maps_id) ? session.session_maps_id[0] : null;
        if (!id) return;
        map = RuleMap.fromJson(await new NormalRequest('/map', {id: id}).send());
    }

    static async loadObjects() {
        const idArray = Array.isArray(map.objectsIds) ? map.objectsIds : [];
        const request = new NormalRequest('/object');
        request.method = NormalRequest.METHOD.POST;
        objects = (await request.send({ids: idArray})).objects.map(RuleGameObject.fromJson);
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
        if (round) round.reset();
        round = new RuleRound(objects);
    }

    static async loadActions() {
        this.reloadActions();
        const actions = await new NormalRequest('/round').send();
        if (Array.isArray(actions.round)) actions.round.forEach(action => round.addAction(RuleActions.fromJson(action, this)));
    }

    static async loadChat() {
        chat = (await new NormalRequest('/chat').send()).map(m => BrowserChatMessage.fromJson(m, StaticController));
        chat.sort((item1, item2) => item2.timestamp - item1.timestamp);
    }

    static async loadParticipants() {
        participants = await new NormalRequest('/participants').send();
    }

    static async loadMusic() {
        music = await new NormalRequest('/todo').send();
    }

    static setMyCharacter() {
        // TODO multiple character support
        if (Array.isArray(account.characters_ids)) myCharacter = StaticController.getCharacter(account.characters_ids[0]);
    }

    static getObjectByCharacter(character) {
        // TODO multiple objects with one template
        return objects.find(obj => obj.character_id === character.id);
    }

    /** @return RuleCharacter */
    static getMyCharacter() {
        return myCharacter;
    }

    /** @return AccountBean */
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

    /** @return Array<AccountBean> */
    static getParticipants() {
        return participants;
    }

    /** @return RuleMap */
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

    /** @return {Array<RuleGameObject>} */
    static getObjects() {
        return objects;
    }

    /** @return RuleGameObject */
    static getObject(id) {
        return objects.find(obj => obj.id === id);
    }

    /** @return {RuleRound} */
    static getRound() {
        return round;
    }

    static sendBeans() {
        const message = new WebSocketMessage(WebSocketMessage.TYPE_OBJECT);
        message.data = RuleCharacterChangesBean.beansToJson();
        if (message.data.length !== 0) BrowserWebSocket.sendMessage(message);
        RuleCharacterChangesBean.init();
    }

    static finishRound() {
        round.finish();
        StaticController.sendBeans();
        StaticController.reloadActions();
        const message = new WebSocketMessage(WebSocketMessage.TYPE_INTENT);
        message.action = "clear";
        BrowserWebSocket.sendMessage(message);
        StaticController.notifySubscribed(WebSocketMessage.TYPE_OBJECT);
        StaticController.sendActionDescription("-----------------New round------------------", {
            isHidden: false,
            dmOnly: false
        });
    }

    static turnBuffs() {
        round.turnBuffs();
        StaticController.sendBeans();
        StaticController.notifySubscribed(WebSocketMessage.TYPE_OBJECT);
    }

    static massiveLocalRollCheck(key, threshold, participants) {
        const playerObjects = objects.filter(item => !item.isHidden && item.owner);
        if (Array.isArray(participants) && participants.length > 0) {
            return playerObjects.filter(item => participants.includes(item.owner) && item.rollValue(key) >= threshold);
        } else {
            return playerObjects.filter(item => item.rollValue(key) >= threshold);
        }
    }

    static massiveRollCheck(key, threshold, participants) {
        const message = new WebSocketMessage(WebSocketMessage.TYPE_ACTION_DEMAND, {
            key: key,
            threshold: threshold
        });
        if (Array.isArray(participants) && participants.length > 0) message.participants = participants.map(acc => acc._id);
        BrowserWebSocket.sendMessage(message);
    }

    /**
     * @param {RuleGameObject} unit
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

    static sendChatMessage(text, toWho) {
        if (!text) return;
        const chatMessage = getMessage(text, toWho);
        chatMessage.isMessage = true;
        chatMessage.targets = Array.from(new Set(toWho));
        chatMessage.send();
        pushMessage(chatMessage);
    }

    /**
     * @param {string} text
     * @param {RuleAction} action
     */
    static sendActionDescription(text, action) {
        if (!text) return;
        const receiver = new Set();
        if (action.isHidden || action.dmOnly) {
            receiver.add(dm._id);
            if (action.isHidden > 0) {
                text += `(Stealth ${action.isHidden}) `;
                if (action.performerObject.owner) receiver.add(action.performerObject.owner._id);
                objects.forEach(obj => {
                    if (obj.owner && obj.rollValue(RuleConstants.SKILL_PERCEPTION) >= action.isHidden) {
                        receiver.add(obj.owner._id);
                    }
                });
            }
        }
        const chatMessage = getMessage(text, Array.from(receiver));
        if (chatMessage.senderId === dm._id) delete chatMessage.senderId;
        chatMessage.send();
        pushMessage(chatMessage);
    }

    static sendRollMessage(char, key, value, passed) {
        if (!char || !key || !value) throw new BadArgumentsError();
        let text = `${char} rolled ${value} on ${key} check`;
        if (typeof passed === "boolean") text += ` and ${passed ? "passed" : "failed"}`;
        const chatMessage = getMessage(text);
        chatMessage.send();
        pushMessage(chatMessage);
        StaticController.notifySubscribed(WebSocketMessage.TYPE_CHAT);
    }

    static pushChatMessage(message) {
        pushMessage(message);
    }
}

TranslationModule.setLanguage(SupportedLanguages.ENG);
TranslationModule.init();
RuleLoader.setLoader(StaticController);

