/**
 * Created by LastBerserk on 26.01.2019.
 */

const CharacterDB = require('../../parse/queries/CharacterDB');
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().get('/loadCharacter', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    CharacterDB.getCharacter(user)
        .then(result => {
            if (result) {
                return res.json(result);
            } else {
                return error.send({error: "No character was found."});
            }
        })
        .catch((e) => error.send(e))
});

require('../../logic/express').getServerExpress().get('/loadGroup', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    CharacterDB.getGroup(user)
        .then(result => res.json(result))
        .catch((e) => error.send(e))
});