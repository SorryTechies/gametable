/**
 * Created by LastBerserk on 21.05.2019.
 */

const ErrorClass = require('../logic/ErrorClass');
const PlaybackController = require('../logic/PlaybackController');
const WebSocketUser = require("../wss/WebSocketServer");

require('../logic/express').getServerExpress().post('/debugReloadData', (req, res) => {
    WebSocketUser.sendToEverybody(WebSocketUser.RELOAD_MAP_MESSAGE);
    WebSocketUser.sendToEverybody(WebSocketUser.RELOAD_CHARACTER);
    WebSocketUser.sendToEverybody(WebSocketUser.NEW_MESSAGE_NOTIFICATION);
    res.json({});
});