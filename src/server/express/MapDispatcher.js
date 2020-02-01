/**
 * Created by LastBerserk on 01.02.2020.
 */

import * as express from "./ExpressWrapper";
import SessionMapDB from "../mongo/classes/SessionMapDB";

express.wrapGet("/map", async req => {
    const session = req.session;
    if (!session) throw new Error("No session provided.");
    const map = await SessionMapDB.getById(session.session_maps_id);
    if (!map) throw new Error("No map found.");
    return map;
});