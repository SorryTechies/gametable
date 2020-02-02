/**
 * Created by LastBerserk on 26.01.2019.
 */

const express = require('express');
import * as bodyParser from 'body-parser';
import * as config from '../config/serverConfig';

const EXPRESS_SERVER = express();
const WEBSOCKET_SERVER = express();

export {EXPRESS_SERVER, WEBSOCKET_SERVER};

EXPRESS_SERVER.listen(config.SERVER_PORT, () => console.log(`Server is running on localhost:${config.SERVER_PORT}`));
EXPRESS_SERVER.use(bodyParser.json());
EXPRESS_SERVER.use('/', express.static('public'));