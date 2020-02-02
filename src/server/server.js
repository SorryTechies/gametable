/**
 * Created by LastBerserk on 25.01.2019.
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as config from './config/serverConfig';
import MongoController from "./mongo/MongoController";
import {EXPRESS_SERVER} from "./logic/ExpressController";

MongoController.init().catch(console.error);

EXPRESS_SERVER.use(bodyParser.json());
EXPRESS_SERVER.use('/', express.static('public'));

import './express/LoginDispatcher';
import './express/MapDispatcher';

EXPRESS_SERVER.listen(config.SERVER_PORT, () => console.log(`Server is running on localhost:${config.SERVER_PORT}`));

import './wss/WebSocketServer';
