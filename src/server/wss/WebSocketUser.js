/**
 * Created by LastBerserk on 30.01.2019.
 */

import * as WebSocket from 'ws';
import AccountDB from "../mongo/classes/AccountDB";

/** @type {Array.<WebSocketUser>} */
const users = [];

export default class WebSocketUser {
    constructor() {
        this.account = null;
        this.ws = [];
    }

    /** @param {WebSocketMessage} message */
    sendMessage(message) {
        this.ws.forEach(ws => ws.readyState === WebSocket.OPEN ? ws.send(message.toJson()) : null);
    }

    removeSocket(ws) {
        const index = this.ws.findIndex(item => ws === item);
        if (index !== -1) this.ws.splice(index, 1);
        if (this.ws.length === 0) WebSocketUser.removeUser(this);
    }

    /**
     * @param {Account} account
     * @param ws
     * @return WebSocketUser
     */
    static findOrCreateByAccount(account, ws) {
        let wsUser = WebSocketUser.findByUser(account);
        if (!wsUser) {
            wsUser = new WebSocketUser();
            users.push(wsUser);
            wsUser.account = account;
        }
        wsUser.ws.push(ws);
        return wsUser;
    }

    /**
     * @param {Account} account
     * @return WebSocketUser
     */
    static findByUser(account) {
        return users.find(user => user.access && user.account._id === account._id);
    }

    static removeUser(user) {
        const index = users.findIndex(item => user === item);
        if (index !== -1) users.splice(index, 1);
    }

    static sendToGameSession(session, message) {
        AccountDB.getParticipantsInGameWithDM(session)
            .then(accounts => accounts.forEach(user => user.sendMessage(message)))
            .catch(console.error);
    }
}