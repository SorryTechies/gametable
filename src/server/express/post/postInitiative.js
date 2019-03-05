/**
 * Created by LastBerserk on 17.02.2019.
 */

const CharacterDB = require('../../parse/queries/CharacterDB');
const GameDB = require('../../parse/queries/GameDB');
const ErrorClass = require('../../logic/ErrorClass');
const Parse = require('../../parse/ParseInit').getParse();
const CombatObject = require("../../parse/classes/CombatObject");
const CombatMap = require("../../parse/classes/CombatMap");
const Character = require("../../parse/classes/Character");
const Game = require("../../parse/classes/Game");
const WebSocketUser = require("../../wss/WebSocketServer");

/**
 * @param {Access} user
 * @param {CombatObject} combObject
 * @return {Promise.<void>}
 */
async function modifyInitiative(user, combObject) {
    const game = await GameDB.searchGame(user);
    const map = await game.map.fetch(Character.USE_MK);
    if (map.initiativeLocked) throw Error('DM already locked the combat.');
    return combObject.save();
}

require('../../logic/express').getServerExpress().post('/rollInitiative', (req, res) => {
    const errorObj = new ErrorClass(res);
    const user = req.access;
    const body = req.body;
    new Parse.Query(CombatObject)
        .matchesQuery(CombatObject.CHARACTER_FIELD, new Parse.Query(Character).equalTo(Character.USER_FIELD, user.toPointer()))
        .first(CombatObject.USE_MK)
        .then(result => {
            if (!result) throw Error('Cannot find combat object for this user.');
            result.initiative = body.initiative;
            return modifyInitiative(user, result);
        })
        .then(() => res.json({}))
        .catch(error => errorObj.send(error))
});

require('../../logic/express').getServerExpress().post('/lockInitiative', (req, res) => {
    const errorObj = new ErrorClass(res);
    const user = req.access;
    const body = req.body;
    new Parse.Query(Game).equalTo(Game.DM_FIELD, user)
        .include(Game.MAP_FIELD)
        .first(Game.USE_MK)
        .then(result => {
            /** @type CombatMap */
            const map = result.map;
            map.initiativeLocked = !map.initiativeLocked;
            map.currentInitiative = null;
            return map.save();
        })
        .then(() => res.json({}))
        .catch(error => errorObj.send(error))
});

require('../../logic/express').getServerExpress().post('/nextTurn', (req, res) => {
    const errorObj = new ErrorClass(res);
    const user = req.access;
    const body = req.body;
    new Parse.Query(Game).equalTo(Game.DM_FIELD, user)
        .include(Game.MAP_FIELD)
        .first(Game.USE_MK)
        .then(async result => {
            /** @type CombatMap */
            const map = result.map;
            const objects = await map.objects.query().find();
            const sortedInitiative = objects.map(item => item.initiative);
            if (map.currentInitiative === undefined || map.currentInitiative === null) {
                map.currentInitiative = sortedInitiative[0];
                return map.save();
            }
            sortedInitiative.sort((item1, item2) => item2 - item1);
            for (let i = 0; i < sortedInitiative.length; i++) {
                if (sortedInitiative[i] < map.currentInitiative) {
                    map.currentInitiative = sortedInitiative[i];
                    return map.save();
                }
            }
            map.currentInitiative = sortedInitiative[0];
            return map.save();
        })
        .then(() => res.json({}))
        .then(() => WebSocketUser.sendToEverybody(WebSocketUser.RELOAD_MAP_MESSAGE))
        .catch(error => errorObj.send(error))
});