/**
 * Created by LastBerserk on 25.01.2019.
 */

const server = require('./logic/express').getServerExpress();
const parse = require('./logic/express').getParseExpress();
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config/serverConfig');

const ParseServer = require('parse-server').ParseServer;
const api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/dev',
    appId: config.PARSE_ID,
    masterKey: config.PARSE_MK,
});

parse.use('/parse', api);
parse.listen(config.PARSE_PORT);

const Parse = require('parse/node').Parse;
const ParseInit = require('./parse/ParseInit');
ParseInit.init(Parse, `${config.PARSE_PROTOCOL}://localhost:${config.PARSE_PORT}${config.PARSE_PATH}`);

server.use(bodyParser.json());
server.use('/', express.static('public'));
require('./logic/auth');
require('./express/get/login');
require('./express/get/getMessages');
require('./express/post/sendMessage');
require('./express/get/getParticipants');
require('./express/get/getCharacter');
require('./express/get/getAttacks');
require('./express/post/changeCharacter');
require('./express/get/getMap');
require('./express/post/saveMapChanges');
require('./express/post/postInitiative');
require('./express/getPlaybackStatus');
require('./express/post/sendRoll');
server.listen(config.SERVER_PORT, () => console.log(`Server is running on localhost:${config.SERVER_PORT}`));

// require('./temp/CreateCharacters');
// require('./temp/CreateAttacks');
// require('./temp/CreateMap');
// require('./temp/CreateObjects');

require('./express/debugDisp');

require('./wss/WebSocketServer');

require('./scripts/TransformCharactersToFlexCore');
