/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as Headers from '../../common/Headers';
import GameSessionDB from "../mongo/classes/GameSessionDB";
import {EXPRESS_SERVER} from "./ExpressController";
import AccountDB from "../mongo/classes/AccountDB";

function excludePublicPaths(path) {
    if (path.startsWith("/icons/")) return true;
    if (path.startsWith("/maps/")) return true;
    if (path.startsWith("/sound/")) return true;
    switch (path) {
        case "/favicon.ico":
        case "/index.html":
        case "/styles.css":
        case "/bundle.js":
            return true;
    }
    return false;
}

EXPRESS_SERVER.use(async (req, res, next) => {
    try {
        if (excludePublicPaths(req.path)) return next();
        const login = req.headers[Headers.LOGIN_HEADER.toLowerCase()];
        const sessionID = req.headers[Headers.X_SESSION_HEADER.toLowerCase()];
        if (!login) throw new Error("No login provided.");
        const user = await AccountDB.getByUsername(login);
        if (!user) throw new Error("No user found in database.");
        req.access = user;
        if (sessionID) req.session = await GameSessionDB.getById(sessionID);
        next();
    } catch (e) {
        console.error(e);
        res.status(401).send({error: "Unauthorized."});
    }
});