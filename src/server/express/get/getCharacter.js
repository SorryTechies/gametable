/**
 * Created by LastBerserk on 26.01.2019.
 */

const CharacterDB = require('../../parse/queries/CharacterDB');
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().get('/loadCharacter', async (req, res) => {
    try {
        const user = req.access;
        const character = await CharacterDB.getCharacter(user);
        if (!character) throw new Error("No character was found.");
        return res.json(character);
    } catch (e) {
        new ErrorClass(res).send(e);
    }
});

require('../../logic/express').getServerExpress().get('/loadGroup', async (req, res) => {
    try {
        const user = req.access;
        return res.json(await CharacterDB.getGroup(user));
    } catch (e) {
        new ErrorClass(res).send(e);
    }
});