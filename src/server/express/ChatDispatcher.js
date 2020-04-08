/**
 * Created by LastBerserk on 01.02.2020.
 */

import * as express from "./ExpressWrapper";
import ChatMessageDB from "../mongo/classes/ChatMessageDB";
import AccountDB from "../mongo/classes/AccountDB";

express.wrapGet("/chat", async req => {
    const session = req.session;
    if (!session) throw new Error("No session provided.");
    return ChatMessageDB.getMessagesForAccountAndSession(req.access, session);
});

express.wrapGet("/participants", async req => {
    const session = req.session;
    if (!session) throw new Error("No session provided.");
    return (await AccountDB.getParticipantsInGameWithDM(session)).map(account => ({
        username: account.username,
        _id: account._id,
        characters_ids: account.characters_ids
    }));
});