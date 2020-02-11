/**
 * Created by LastBerserk on 25.01.2019.
 */
import MongoController from "./mongo/MongoController";

import './logic/AuthController';

import './express/LoginDispatcher';
import './express/MapDispatcher';
import './express/ChatDispatcher';
import './express/SessionDispatcher';
import './express/CharacterDispatcher';
import './express/CharacterTemplateDispatcher';
import './express/GameObjectDispatcher';
import './express/RoundActionDispatcher';
import './express/TodoDispatcher';

import './wss/WebSocketServer';

MongoController.init().catch(console.error);
