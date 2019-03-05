/**
 * Created by LastBerserk on 26.01.2019.
 */

const AttackDB = require('../../parse/queries/AttackDB');
const ErrorClass = require('../../logic/ErrorClass');

require('../../logic/express').getServerExpress().post('/loadAttacks', (req, res) => {
    const error = new ErrorClass(res);
    const user = req.access;
    const body = req.body;
    AttackDB.loadAttacks(body.ids)
        .then(result => res.json(result))
        .catch((e) => error.send(e))
});