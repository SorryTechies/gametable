/**
 * Created by LastBerserk on 02.02.2020.
 */

import * as express from "./ExpressWrapper";

express.wrapGet("/todo", async () => {
    throw new Error("Not implemented.");
});