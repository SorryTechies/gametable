/**
 * Created by LastBerserk on 01.02.2020.
 */

import * as express from "./ExpressWrapper";
import GameSessionDB from "../mongo/classes/GameSessionDB";

express.wrapGet("/session", async req => {
    const id = req.query.id;
    if (!id) throw new Error("No session id provided.");
    const session = await GameSessionDB.getById(id);
    if (!session) throw new Error("No session with id " + id + " found.");
    return session;
});