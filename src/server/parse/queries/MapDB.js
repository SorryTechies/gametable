/**
 * Created by LastBerserk on 26.01.2019.
 */

const Parse = require('../ParseInit').getParse();
const Game = require("../classes/Game");
const CombatMap = require("../classes/CombatMap");

module.exports.findCurrentMap = game =>
    new Parse.Query(CombatMap)
        .get(game.map.id, {useMasterKey: true});