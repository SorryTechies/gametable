/**
 * Created by LastBerserk on 26.01.2019.
 */

const GameDB = require('../../parse/queries/GameDB');
const AccessDB = require('../../parse/queries/AccessDB');
const Message = require("../../parse/classes/Message");
const WebSocketUser = require("../../wss/WebSocketServer");
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().post('/sendMessage', async (req, res) => {
    try {
        const user = req.access;
        const body = req.body;
        const getMessage = () => {
            const message = new Message();
            message.sender = user;
            message.content = body.message;
            return message;
        };
        let receiversNames = [user];
        const dmGame = await GameDB.searchAsDM(user);
        const message = getMessage();
        if (dmGame) {
            if (body && body.to === "ALL") {
                const dmGame = await GameDB.searchAsDM(user);
                message.receiver = dmGame.players;
                receiversNames = receiversNames.concat(dmGame.players);
            } else {
                const to = await AccessDB.getUser(body.to);
                if (!to) throw new Error(`No user ${body.to} was found.`);
                message.receiver = [to];
                receiversNames.push(to);
            }
        } else {
            const playerGame = await GameDB.searchAsPlayer(user);
            if (!playerGame) throw new Error("No game found.");
            message.receiver = [playerGame.dm];
            receiversNames.push(playerGame.dm);
        }
        message.receiver.push(user);
        await message.save();
        res.send({});
        receiversNames.forEach(player => WebSocketUser.sendMessageToUser(player, WebSocketUser.NEW_MESSAGE_NOTIFICATION));
    } catch (e) {
        return new ErrorClass(res).send(e);
    }
});