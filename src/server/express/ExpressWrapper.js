/**
 * Created by LastBerserk on 01.02.2020.
 */

import {EXPRESS_SERVER} from "../logic/ExpressController";

export function wrapGet(path, func) {
    EXPRESS_SERVER.get(path, async (req, res) => {
        try {
            let ans;
            ans = await func();
            if (!ans) ans = {};
            res.json(ans);
        } catch (e) {
            res.status(500).send({error: e.message});
        }
    });
}

export function wrapPost(path, func) {
    EXPRESS_SERVER.post(path, async (req, res) => {
        try {
            let ans;
            ans = await func();
            if (!ans) ans = {};
            res.json(ans);
        } catch (e) {
            res.status(500).send({error: e.message});
        }
    });
}