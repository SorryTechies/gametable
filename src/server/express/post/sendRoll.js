/**
 * Created by LastBerserk on 12.08.2019.
 */

const WebSocketUser = require("../../wss/WebSocketServer");
const ErrorClass = require('../../logic/ErrorClass');
const GameDB = require('../../parse/queries/GameDB');
const Message = require("../../parse/classes/Message");

require('../../logic/express').getServerExpress().post('/demandRoll', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    const body = req.body;
    (async () => {
        const dmGame = await GameDB.searchAsDM(user);
        return dmGame.players;
    })()
        .then(result => {
            const rollDemand = body.roll;
            if (!rollDemand) throw Error("No roll data.");
            const roll = WebSocketUser.DEMAND_ROLL;
            roll.roll = rollDemand;
            result.forEach(player => WebSocketUser.sendMessageToUser(player, roll));
        })
        .then(res.send.bind(res, {}))
        .catch(error.send.bind(error))
});

require('../../logic/express').getServerExpress().post('/postRollResult', async (req, res) => {
    try {
        const user = req.access;
        const body = req.body;
        const game = await GameDB.searchGame(user);
        const dm = game.dm;
        const message = new Message();
        message.sender = user;
        message.receiver = [dm];
        message.content = `${user.username} rolled ${body.description} result ${body.result}(raw ${body.rawResult})`;
        await message.save();
        return res.send({});
    } catch (e) {
        return new ErrorClass(res).send(e);
    }
});