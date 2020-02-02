/**
 * Created by LastBerserk on 01.02.2020.
 */

import {EXPRESS_SERVER} from "../logic/ExpressController";

async function wrap(path, func, wrapFunc) {
    wrapFunc(path, async (req, res) => {
        try {
            let ans;
            if (typeof func === "function") ans = await func(req, res);
            if (!ans) ans = {};
            res.json(ans);
        } catch (e) {
            console.error(e);
            res.status(500).send({error: e.message});
        }
    });
}

export function wrapGet(path, func) {
    wrap(path, func, EXPRESS_SERVER.get.bind(EXPRESS_SERVER));
}

export function wrapPost(path, func) {
    wrap(path, func, EXPRESS_SERVER.post.bind(EXPRESS_SERVER));
}