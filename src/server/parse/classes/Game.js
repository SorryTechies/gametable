/**
 * Created by LastBerserk on 25.01.2019.
 */

const ParseSubclass = require('../ParseSubclass');

class Game extends ParseSubclass {
    constructor() {
        super(Game.CLASS_NAME);
    }

    /** @return {Array} */
    get players() {
        return this.get(Game.PLAYERS_FIELD)
    }

    /** @param {Array} players */
    set players(players) {
        this.set(Game.PLAYERS_FIELD, players)
    }

    /** @return {Access} */
    get dm() {
        return this.get(Game.DM_FIELD)
    }

    /** @param {Access} players */
    set dm(players) {
        this.set(Game.DM_FIELD, players)
    }

    /** @return {CombatMap} */
    get map() {
        return this.get(Game.MAP_FIELD)
    }

    /** @param {CombatMap} map */
    set map(map) {
        this.set(Game.MAP_FIELD, map)
    }
}

Game.CLASS_NAME = 'Game';
Game.PLAYERS_FIELD = 'players';
Game.DM_FIELD = 'dm';
Game.MAP_FIELD = 'map';

module.exports = Game;