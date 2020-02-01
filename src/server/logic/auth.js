/**
 * Created by LastBerserk on 26.01.2019.
 */

const Headers = require('../../common/Headers');
import GameSessionDB from "../mongo/classes/GameSessionDB";
import AccountDB from "../mongo/classes/AccountDB";

require('../logic/express').getServerExpress().use((req, res, next) => {
    const sendError = () => res.status(402).send({error: "No such login found."});
    const login = req.headers[Headers.LOGIN_HEADER.toLowerCase()];
    const sessionID = req.headers[Headers.X_SESSION_HEADER.toLowerCase()];
    if (!login) return sendError();
    (async () => {
        const user = await AccountDB.getByUsername(login);
        req.access = user;
        if (!user) return sendError();
        if (sessionID) req.session = await GameSessionDB.getById(sessionID);
        next();
    })().catch(sendError);
});