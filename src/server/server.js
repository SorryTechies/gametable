/**
 * Created by LastBerserk on 25.01.2019.
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as config from './config/serverConfig';
import MongoController from "./mongo/MongoController";
import {getServerExpress} from "./logic/ExpressController";

MongoController.init().catch(console.error);

const server = getServerExpress();
server.use(bodyParser.json());
server.use('/', express.static('public'));
require('./logic/AuthController');
require('./express/LoginDispatcher');
require('./express/get/getMessages');
require('./express/post/sendMessage');
require('./express/get/getParticipants');
require('./express/get/getCharacter');
require('./express/get/getAttacks');
require('./express/post/saveCharacter');
require('./express/get/getMap');
require('./express/post/saveMapChanges');
require('./express/post/postInitiative');
require('./express/getPlaybackStatus');
require('./express/post/sendRoll');
server.listen(config.SERVER_PORT, () => console.log(`Server is running on localhost:${config.SERVER_PORT}`));

require('./express/debugDisp');

require('./wss/WebSocketServer');
