/**
 * Created by LastBerserk on 26.01.2019.
 */

const Parse = require('../ParseInit').getParse();
const Character = require("../classes/Character");
const Game = require("../classes/Game");

module.exports.getCharacter = (access) =>
    new Parse.Query(Character).equalTo(Character.USER_FIELD, access).first({useMasterKey: true});

module.exports.saveCharacter = async json => {
    json.className = Character.CLASS_NAME;
    /** @type Character */
    const character = await new Parse.Query(Character.CLASS_NAME).get(json.objectId, {useMasterKey: true});
    character.damage = json.damage;
    character.level = json.level;
    character.hpDice = json.hpDice;
    character.spellSlots = json.spellSlots;
    character.spellSlotsUsed = json.spellSlotsUsed;
    character.data = json.data;
    character.feats = json.feats;
    character.items = json.items;
    character.abilities = json.abilities;
    character.spells = json.spells;
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