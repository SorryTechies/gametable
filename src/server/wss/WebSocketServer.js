/**
 * Created by LastBerserk on 30.01.2019.
 */

const config = require('../config/serverConfig');

import * as ws from 'ws';
import {getWebSocketExpress} from "../logic/ExpressController";
import WebSocketUser from "./WebSocketUser";
import WebSocketWrap from "./WebSocketWrap";

const webSocketApp = getWebSocketExpress();

const wss = new ws.Server({
    server: webSocketApp,
    port: config.WSS_PORT
});

wss.on('connection', (ws, req) => {
    const ip = req.connection.remoteAddress;
    console.log("New connection from " + ip);
    const wrap = new WebSocketWrap(ws, ip);
    wrap.onAuth = async auth => {
        // TODO AUTH
        if (auth === 'apples') {
            console.log("Authorized as " + 'apples' + " for" + ip);
            const acc = {username: 'apples'};
            const user = WebSocketUser.findOrCreateByAccount(acc, ws);
            wrap.onDelete = () => user.removeSocket(ws);
        } else {
            throw new Error("Unauthorized.");
        }
    };
});