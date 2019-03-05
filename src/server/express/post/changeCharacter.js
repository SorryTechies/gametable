/**
 * Created by LastBerserk on 26.01.2019.
 */

const CharacterDB = require('../../parse/queries/CharacterDB');
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().post('/saveCharacter', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    const body = req.body;
    CharacterDB.saveCharacter(body)
        .then(result => res.json({}))
        .catch((e) => error.send(e))
});