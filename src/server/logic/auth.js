/**
 * Created by LastBerserk on 26.01.2019.
 */

const AccessDB = require('../parse/queries/AccessDB');
const Headers = require('../../common/Headers');

require('../logic/express').getServerExpress().use((req, res, next) => {
    const sendError = () => res.status(402).send({error: "No such login found."});
    const login = req.headers[Headers.LOGIN_HEADER.toLowerCase()];
    if (!login) return sendError();
    (async () => {
        const user = await AccessDB.getUser(login);
        req.access = user;
        if (!user) return sendError();
        next();
    })().catch(e => sendError());
});