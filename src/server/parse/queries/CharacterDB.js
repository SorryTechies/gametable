/**
 * Created by LastBerserk on 26.01.2019.
 */

const Parse = require('../ParseInit').getParse();
const Character = require("../classes/Character");
const Game = require("../classes/Game");

module.exports.getCharacter = (access) =>
    new Parse.Query(Character).equalTo(Character.USER_FIELD, access).first({useMasterKey: true});

function copyNonZeroVars(obj) {
    const ans = {};
    Object.keys(obj).forEach(key => {
        if (obj[key]) ans[key] = obj[key];
    });
    return ans;
}

module.exports.saveCharacter = async json => {
    json.className = Character.CLASS_NAME;
    /** @type Character */
    const character = await new Parse.Query(Character.CLASS_NAME).get(json.objectId, {useMasterKey: true});
    const setIfExists = name => {
        if (typeof json[name]) {
            character[name] = json[name];
        }
    };
    setIfExists(Character.LEVEL_FIELD);
    setIfExists(Character.STATS_FIELD);
    setIfExists(Character.SKILLS_FIELD);
    setIfExists(Character.OFFENSE_FIELD);
    setIfExists(Character.DEFENSE_FIELD);
    setIfExists(Character.SAVES_FIELD);
    setIfExists(Character.STATES_FIELD);
    if (typeof json[Character.DATA_FIELED] !== "undefined") {
        character[Character.DATA_FIELED] = copyNonZeroVars(json[Character.DATA_FIELED]);
    }
    return character.save();
};

module.exports.getGroup = (access) =>
    new Parse.Query(Character)
        .matchesKeyInQuery(
            Character.USER_FIELD,
            Game.PLAYERS_FIELD,
            new Parse.Query(Game)
                .equalTo(Game.DM_FIELD, access)
        )
        .include(Character.USER_FIELD)
        .find({useMasterKey: true});