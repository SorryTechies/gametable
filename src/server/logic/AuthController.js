/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as Headers from '../../common/Headers';
import GameSessionDB from "../mongo/classes/GameSessionDB";
import {EXPRESS_SERVER} from "./ExpressController";
import AccountDB from "../mongo/classes/AccountDB";

EXPRESS_SERVER.use(async (req, res, next) => {
    try {
        const login = req.headers[Headers.LOGIN_HEADER.toLowerCase()];
        const sessionID = req.headers[Headers.X_SESSION_HEADER.toLowerCase()];
        if (!login) throw new Error("Unauthorized.");
        const user = await AccountDB.getByUsername(login);
        req.access = user;
        if (!user) throw new Error("Unauthorized.");
        if (sessionID) req.session = await GameSessionDB.getById(sessionID);
        next();
    } catch (e) {
        console.error(e);
        res.status(402).send({error: "No such login found."});
    }
});