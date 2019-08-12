/**
 * Created by LastBerserk on 12.08.2019.
 */

const WebSocketUser = require("../../wss/WebSocketServer");
const ErrorClass = require('../../logic/ErrorClass');
const GameDB = require('../../parse/queries/GameDB');

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