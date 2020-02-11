/**
 * Created by LastBerserk on 01.02.2020.
 */

import * as express from "./ExpressWrapper";
import RoundActionCache from "../logic/RoundActionCache";

express.wrapGet("/round", async req => {
    const session = req.session;
    if (!session) throw new Error("No session provided.");
    return {round: RoundActionCache.getActions(session._id)};
});