/**
 * Created by LastBerserk on 30.01.2019.
 */

import * as WebSocket from 'ws';
import AccountDB from "../mongo/classes/AccountDB";

/** @type {Array<WebSocketUser>} */
const users = [];

export default class WebSocketUser {
    constructor() {
        this.account = null;
        this.ws = [];
    }

    /**
     * @param {WebSocketMessage} message
     * @param [wss] - websocket to exclude
     */
    sendMessage(message, wss) {
        this.ws.forEach(ws => (!wss || wss !== ws) && ws.readyState === WebSocket.OPEN ? ws.send(message.toJson()) : null);
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
     * @param {Account|string} account
     * @return WebSocketUser
     */
    static findByUser(account) {
        const id = (typeof account === "string" ? account : account._id).toString();
        return users.find(user => user.account && user.account._id.toString() === id);
    }

    /**
     * @param {Array.<Account|string>} accounts
     * @return {Array.<WebSocketUser>}
     */
    static findByUsers(accounts) {
        return users.filter(user => !!accounts.find(acc =>
        (typeof acc === "string" ? acc : acc._id) === user.account._id));
    }

    static removeUser(user) {
        const index = users.findIndex(item => user === item);
        if (index !== -1) users.splice(index, 1);
    }

    /**
     * @param {WebSocketMessage} message
     * @param {Array.<Account>} accounts
     * @param [ws]
     */
    static sendToUsers(message, accounts, ws) {
        WebSocketUser.findByUsers(accounts).forEach(user => user.sendMessage(message, ws));
    }

    /**
     * @param {GameSession} session
     * @param {WebSocketMessage} message
     * @param [ws]
     */
    static sendToGameSession(session, message, ws) {
        AccountDB.getParticipantsInGameWithDM(session)
            .then(accounts => accounts.forEach(account => {
                const webUser = WebSocketUser.findByUser(account);
                if (webUser) webUser.sendMessage(message, ws);
            }))
            .catch(console.error);
    }

    /**
     * @param {GameSession} session
     * @param {WebSocketMessage} message
     * @param [ws]
     */
    static sendToTheDM(session, message, ws) {
        const webUser = WebSocketUser.findByUser(session.owner_id);
        if (webUser) webUser.sendMessage(message, ws);
    }
}