/**
 * Created by LastBerserk on 26.01.2019.
 */

const express = require('express');
const server = express();
const parse = express();
const webSocket = express();

module.exports.getServerExpress = () => server;
module.exports.getParseExpress = () => parse;
module.exports.getWebSocketExpress = () => webSocket;