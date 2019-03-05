/**
 * Created by LastBerserk on 26.01.2019.
 */

const GameDB = require('../../parse/queries/GameDB');
const AccessDB = require('../../parse/queries/AccessDB');
const Message = require("../../parse/classes/Message");
const WebSocketUser = require("../../wss/WebSocketServer");
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().post('/sendMessage', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    const body = req.body;
    const getMessage = () => {
        const message = new Message();
        message.sender = user;
        message.content = body.message;
        return message;
    };
    let receiversNames = [user];
    (async () => {
        const dmGame = await GameDB.searchAsDM(user);
        if (dmGame) {
            const message = getMessage();
            if (body && body.to === "ALL") {
                const dmGame = await GameDB.searchAsDM(user);
                message.receiver = dmGame.players;
                receiversNames = receiversNames.concat(dmGame.players);
            } else {
                const to = await AccessDB.getUser(body.to);
                if (to) {
                    message.receiver = [to];
                    receiversNames.push(to);
                } else {
                    throw Error(`No user ${body.to} was found.`)
                }
            }
            return message.save();
        } else {
            const playerGame = await GameDB.searchAsPlayer(user);
            if (!playerGame) return Promise.reject("No game found.");
            const message = getMessage();
            message.receiver = [playerGame.dm];
            receiversNames.push(playerGame.dm);
            return message.save();
        }
    })()
        .then(() => res.send({}))
        .then(() => receiversNames.forEach(player => WebSocketUser.sendMessageToUser(player, WebSocketUser.NEW_MESSAGE_NOTIFICATION)))
        .catch((e) => error.send(e));
});