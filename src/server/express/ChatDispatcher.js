/**
 * Created by LastBerserk on 01.02.2020.
 */

import * as express from "./ExpressWrapper";
import ChatMessageDB from "../mongo/classes/ChatMessageDB";

express.wrapGet("/chat", async req => {
    const session = req.session;
    if (!session) throw new Error("No session provided.");
    return ChatMessageDB.getMessagesForAccountAndSession(req.access, session);
});