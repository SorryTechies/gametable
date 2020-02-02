/**
 * Created by LastBerserk on 30.01.2019.
 */

const config = require('../config/serverConfig');

import * as ws from 'ws';
import AccountDB from "../mongo/classes/AccountDB";
import {WEBSOCKET_SERVER} from "../logic/ExpressController";
import WebSocketUser from "./WebSocketUser";
import WebSocketWrap from "./WebSocketWrap";

const wss = new ws.Server({
    server: WEBSOCKET_SERVER,
    port: config.WSS_PORT
});

wss.on('connection', (ws, req) => {
    const ip = req.connection.remoteAddress;
    console.log("New connection from " + ip);
    const wrap = new WebSocketWrap(ws, ip);
    wrap.onAuth = async auth => {
        const account = await AccountDB.getByUsername(auth);
        if (account) {
            console.log("Authorized as " + account.username + " for" + ip);
            const acc = {username: 'apples'};
            const user = WebSocketUser.findOrCreateByAccount(acc, ws);
            wrap.onDelete = () => user.removeSocket(ws);
        } else {
            throw new Error("Unauthorized.");
        }
    };
});