/**
 * Created by LastBerserk on 30.01.2019.
 */

const config = require('../config/serverConfig');

const ws = require('ws');
const webSocketApp = require('../logic/express').getWebSocketExpress();
const WebSocketUser = require('./WebSocketUser');
const WsConstants = require('../../common/WsConstants');

const wss = new ws.Server({
    server: webSocketApp,
    port: config.WSS_PORT
});

const ERROR_ANS = {error: "ERROR"};

wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        const json = JSON.parse(message);
        const username = json.username;
        if (username) {
            const wsUser = await WebSocketUser.findOrCreateByUserName(username, ws);
            if (!wsUser) return wsUser.sendMessage(ERROR_ANS);
        }
    });
});

class WebSocketServer {
    static sendMessageToUser(access, message) {
        const wsUser = WebSocketUser.findByUser(access);
        if (wsUser) wsUser.sendMessage(message);
    };

    static sendToEverybody(message) {
        try {
            WebSocketUser.sendToAll(message);
        } catch (e) {
            console.log(e);
        }
    };
}

WebSocketServer.NEW_MESSAGE_NOTIFICATION = {notification: WsConstants.STATIC_CHAT};
WebSocketServer.RELOAD_MAP_MESSAGE = {notification: WsConstants.STATIC_MAP};
WebSocketServer.RELOAD_CHARACTER = {notification: WsConstants.STATIC_CHAR};
WebSocketServer.RELOAD_PARTICIPANTS = {notification: WsConstants.STATIC_PARTICIPANTS};

module.exports = WebSocketServer;