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
        let game = await GameDB.searchAsDM(user);
        if (!game) game = await GameDB.searchAsPlayer(user);
        const map = await MapDB.findCurrentMap(game);
        const objects = await map.objects.query().include(CombatObject.CHARACTER_FIELD).find({useMasterKey: true});
        return res.json({
            img: map.img,
            gridX: map.gridX,
            gridY: map.gridY,
            objects: objects,
            initiativeLocked: map.initiativeLocked,
            currentInitiative: map.currentInitiative
        });
    })().catch((e) => error.send(e));
});