/**
 * Created by LastBerserk on 26.01.2019.
 */

const GameDB = require('../../parse/queries/GameDB');
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().get('/getGameParticipants', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    GameDB.searchAsDM(user)
        .then(result => {
            if (!result) return res.json([]);
            return res.json(result.players.map(player => player.username));
        })
        .catch((e) => error.send(e))
});