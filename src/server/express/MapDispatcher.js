/**
 * Created by LastBerserk on 01.02.2020.
 */

import * as express from "./ExpressWrapper";
import SessionMapDB from "../mongo/classes/SessionMapDB";

express.wrapGet("/map", async req => {
    const mapId = req.query.id;
    if (!mapId) throw new Error("No map id provided.");
    const map = await SessionMapDB.getById(mapId);
    if (!map) throw new Error("No map found.");
    return map;
});