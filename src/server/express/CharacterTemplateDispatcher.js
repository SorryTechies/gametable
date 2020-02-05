/**
 * Created by LastBerserk on 04.02.2020.
 */

import * as express from "./ExpressWrapper";
import CharacterTemplateDB from "../mongo/classes/CharacterTemplateDB";

express.wrapGet("/template", async req => {
    const id = req.query.id;
    if (!id) throw new Error("No character id provided.");
    return CharacterTemplateDB.getById(id);
});