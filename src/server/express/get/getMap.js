/**
 * Created by LastBerserk on 26.01.2019.
 */

const GameDB = require('../../parse/queries/GameDB');
const MapDB = require('../../parse/queries/MapDB');
const CombatObject = require('../../parse/classes/CombatObject');
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().get('/getMap', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    (async () => {
        const game = await GameDB.searchGame(user);
        const map = await MapDB.findCurrentMap(game);
        const objects = await map.objects.query().include(CombatObject.CHARACTER_FIELD).find({useMasterKey: true});
        const ans = {
            img: map.img,
            gridX: map.gridX,
            gridY: map.gridY,
            objects: objects,
            initiativeLocked: map.initiativeLocked,
            currentInitiative: map.currentInitiative
        };
        if (user.isDM) ans.dmImg = map.dmImg;
        return res.json(ans);
    })().catch((e) => error.send(e));
});