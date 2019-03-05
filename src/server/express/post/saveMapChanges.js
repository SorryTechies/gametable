/**
 * Created by LastBerserk on 26.01.2019.
 */

const Parse = require('../../parse/ParseInit').getParse();
const CombatObject = require('../../parse/classes/CombatObject');
const CombatMap = require('../../parse/classes/CombatMap');
const Game = require('../../parse/classes/Game');
const WebSocketUser = require("../../wss/WebSocketServer");
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().post('/saveObject', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    const body = req.body;
    (async () => {
        /** @type CombatObject */
        const object = await new Parse.Query(CombatObject)
            .get(body.objectId, {useMasterKey: true});
        if (!object) throw Error('Object not found');
        object.x = body.x;
        object.y = body.y;
        object.buffs = body.buffs;
        await object.save();
        return res.json({});
    })()
        .then(() => WebSocketUser.sendToEverybody(WebSocketUser.RELOAD_MAP_MESSAGE))
        .catch((e) => error.send(e));
});

require('../../logic/express').getServerExpress().get('/nextTurn', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    (async () => {
        if (!user.isDM) return res.json({});
        const game = await new Parse.Query(Game)
            .equalTo(Game.DM_FIELD, user)
            .include(Game.MAP_FIELD)
            .include(Game.MAP_FIELD + '.' + CombatMap.OBJECTS_FIELD)
            .first({useMasterKey: true});
        /** @type [CombatObject] */
        const objects = game.map.objects;
        objects.sort((item1,item2) => item1.initiative - item2.initiative);
        const nextObject = objects.find(item => item.initiative < game.currentInitiative);
        game.map.currentInitiative = nextObject.initiative;
        return game.map.save();
    })()
        .then(() => res.json({}))
        .catch((e) => error.send(e));
});