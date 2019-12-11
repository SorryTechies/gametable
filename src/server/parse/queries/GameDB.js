/**
 * Created by LastBerserk on 26.01.2019.
 */

const Parse = require('../ParseInit').getParse();
const Game = require("../classes/Game");

function findAsDM(access) {
    return new Parse.Query(Game)
        .equalTo(Game.DM_FIELD, access)
        .include(Game.DM_FIELD)
        .include(Game.PLAYERS_FIELD)
        .first({useMasterKey: true});
}

function findAsPlayer(access) {
    return new Parse.Query(Game)
        .equalTo(Game.PLAYERS_FIELD, access.toPointer())
        .include(Game.DM_FIELD)
        .include(Game.PLAYERS_FIELD)
        .first({useMasterKey: true});
}

/**
 * @param {Access} access
 * @return Promise<Game>
 */
function getCurrentGame(access) {
    return Promise.all([
        findAsDM(access),
        findAsPlayer(access)
    ])
        .then(result => {
            if (result[0]) return result[0];
            if (result[1]) return result[1];
            throw Error('No game found for user.');
        });
}

module.exports.searchAsDM = findAsDM;
module.exports.searchAsPlayer = findAsPlayer;
module.exports.searchGame = getCurrentGame;