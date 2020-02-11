/**
 * Created by LastBerserk on 04.02.2020.
 */

import * as express from "./ExpressWrapper";
import GameObjectDB from "../mongo/classes/GameObjectDB";

express.wrapPost("/object", async req => {
    const ids = req.body.ids;
    if (!Array.isArray(ids)) throw new Error("No game objects ids provided.");
    return {objects: await GameObjectDB.findByIds(ids)};
});