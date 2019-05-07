/**
 * Created by LastBerserk on 26.01.2019.
 */

const ErrorClass = require('../../logic/ErrorClass');
const PlaybackController = require('../../logic/PlaybackController');

require('../../logic/express').getServerExpress().get('/getPlaybackStatus', (req, res) => {
    const error = new ErrorClass(res);
    try {
        res.json(PlaybackController.getPlayback());
    } catch (e) {
        error.send(e);
    }
});

require('../../logic/express').getServerExpress().post('/postPlaybackStatus', (req, res) => {
    const error = new ErrorClass(res);
    const body = req.body;
    try {
        PlaybackController.startPlayback(body);
        res.json({});
    } catch (e) {
        error.send(e);
    }
});