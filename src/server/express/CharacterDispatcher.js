/**
 * Created by LastBerserk on 02.02.2020.
 */

import * as express from "./ExpressWrapper";
import CharacterDB from "../mongo/classes/CharacterDB";

express.wrapGet("/character", async req => {
    const id = req.query.id;
    if (!id) throw new Error("No character id provided.");
    return CharacterDB.getById(id);
});

express.wrapPost("/character", async req => {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) throw new Error("No character ids provided.");
    return {characters: await CharacterDB.findByIds(ids)};
});