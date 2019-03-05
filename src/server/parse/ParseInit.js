/**
 * Created by LastBerserk on 25.01.2019.
 */

const config = require('../config/serverConfig');

let Parse;

class ParseInit {
    static init(parse, url) {
        Parse = parse;

        const Access = require("./classes/Access");
        Parse.Object.registerSubclass(Access.CLASS_NAME, Access);

        const Game = require("./classes/Game");
        Parse.Object.registerSubclass(Game.CLASS_NAME, Game);

        const Message = require("./classes/Message");
        Parse.Object.registerSubclass(Message.CLASS_NAME, Message);

        const Character = require("./classes/Character");
        Parse.Object.registerSubclass(Character.CLASS_NAME, Character);

        const Attack = require("./classes/Attack");
        Parse.Object.registerSubclass(Attack.CLASS_NAME, Attack);

        const CombatMap = require("./classes/CombatMap");
        Parse.Object.registerSubclass(CombatMap.CLASS_NAME, CombatMap);

        const CombatObject = require("./classes/CombatObject");
        Parse.Object.registerSubclass(CombatObject.CLASS_NAME, CombatObject);

        Parse.serverURL = url;
        Parse.Cloud.useMasterKey = true;
        Parse.initialize(config.PARSE_ID);
        Parse.masterKey = config.PARSE_MK;
    }

    static getParse() {
        return Parse;
    }
}

module.exports = ParseInit;