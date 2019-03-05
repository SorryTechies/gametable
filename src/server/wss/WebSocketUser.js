/**
 * Created by LastBerserk on 30.01.2019.
 */

const WebSocket = require('ws');
const AccessDB = require("../parse/queries/AccessDB");

class WebSocketUser {
    constructor() {
        this.name = "";
        this.access = null;
        this.ws = null;
    }

    sendMessage(message) {
        if (this.ws.readyState === WebSocket.OPEN)
            this.ws.send(JSON.stringify(message));
    }
}

const users = [];

module.exports.findOrCreateByUserName = async (accessName, ws) => {
    let wsUser = users.find(item => item.name === accessName);
    if (wsUser) {
        wsUser.ws = ws;
        return wsUser;
    }
    const user = await AccessDB.getUser(accessName);
    if (!user) return null;
    wsUser = new WebSocketUser();
    wsUser.name = accessName;
    wsUser.access = user;
    wsUser.ws = ws;
    users.push(wsUser);
    return wsUser;
};

/**
 * @param {Access} access
 * @return ?WebSocketUser
 */
module.exports.findByUser = access => users.find(item => item.access === access);

module.exports.sendToAll = message => {
    users.forEach(user => user.sendMessage(message));
};