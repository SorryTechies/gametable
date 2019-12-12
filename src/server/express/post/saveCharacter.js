/**
 * Created by LastBerserk on 26.01.2019.
 */

const CharacterDB = require('../../parse/queries/CharacterDB');
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().post('/saveCharacter', async (req, res) => {
    try {
        await CharacterDB.saveCharacter(req.body);
        res.json({});
    } catch (e) {
        return new ErrorClass(res).send(e);
    }
});