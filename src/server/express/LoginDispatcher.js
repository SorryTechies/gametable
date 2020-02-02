/**
 * Created by LastBerserk on 26.01.2019.
 */

import * as express from "./ExpressWrapper";

express.wrapGet('/login', req => req.access);