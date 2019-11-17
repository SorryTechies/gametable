/**
 * Created by LastBerserk on 26.01.2019.
 */

const Parse = require('../../parse/ParseInit').getParse();
const CombatObject = require('../../parse/classes/CombatObject');
const CombatMap = require('../../parse/classes/CombatMap');
const Game = require('../../parse/classes/Game');
const WebSocketUser = require("../../wss/WebSocketServer");
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().post('/saveObject', async (req, res) => {
    try {
        const body = req.body;
        /** @type CombatObject */
        const object = await new Parse.Query(CombatObject).get(body.objectId, {useMasterKey: true});
        if (!object) throw Error('Object not found');
        object.x = body.x;
        object.y = body.y;
        object.data = body.data;
        object.buffs = body.buffs;
        await object.save();
        res.json({});
        WebSocketUser.sendToEverybody(WebSocketUser.RELOAD_MAP_MESSAGE);
    } catch (e) {
        return new ErrorClass(res).send(e);
    }
});

require('../../logic/express').getServerExpress().get('/nextTurn', async (req, res) => {
    try {
        const user = req.access;
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
        await game.map.save();
        res.json({});
    } catch (e) {
        return new ErrorClass(res).send(e);
    }
});