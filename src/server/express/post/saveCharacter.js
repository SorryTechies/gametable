/**
 * Created by LastBerserk on 26.01.2019.
 */

const CharacterDB = require('../../parse/queries/CharacterDB');
const GameDB = require('../../parse/queries/GameDB');
const ErrorClass = require('../../logic/ErrorClass');
const WebSocketUser = require("../../wss/WebSocketServer");

require('../../logic/express').getServerExpress().post('/saveCharacter', async (req, res) => {
    try {
        await CharacterDB.saveCharacter(req.body);
        WebSocketUser.sendToAllInGame((await GameDB.searchGame(req.access)), WebSocketUser.RELOAD_MAP_MESSAGE);
        res.json({});
    } catch (e) {
        return new ErrorClass(res).send(e);
    }
});