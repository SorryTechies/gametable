/**
 * Created by LastBerserk on 30.01.2019.
 */

import * as config from "../../../common/config";

let ws = null;
let timeout = null;
/**
 * @type {[{id: string, func: function}]}
 */
let subscribers = [];

export default class BrowserWebSocket {
    static init(username) {
        const location = window.location.hostname;
        ws = new WebSocket(`ws://${location}:${config.WSS_PORT}`);
        ws.onopen = () => {
            console.log("Ws opened.");
            ws.send(JSON.stringify({username: username}));
            if (timeout !== null) {
                clearInterval(timeout);
                subscribers.forEach(obj => obj.func())
            }
        };
        ws.onclose = () => {
            console.log("Ws closed.");
            timeout = setInterval(() => {
                if (ws !== null) {
                    ws.onclose = undefined;
                    ws.close();
                }
                BrowserWebSocket.init(username);
            }, 10000);
        };

        ws.onmessage = evt => {
            try {
                const message = JSON.parse(evt.data);
                if (!message) return message;
                const error = message.error;
                if (error) return console.log(error);
                const notification = message.notification;
                for (let i = 0; i < subscribers.length; i++) {
                    if (subscribers[i].id === notification) {
                        subscribers[i].func();
                        break;
                    }
                }
                switch (notification) {
                    case "message":
                        new Audio('https://www.soundjay.com/button/sounds/button-32.mp3').play();
                        break;
                }
            } catch (e) {
                console.log(e);
            }
        };
    }

    static subscribe = obj => subscribers.push(obj);

    static closeConnection() {
        ws.onclose = undefined;
        subscribers = [];
        ws.close();
    };

    static unSubscribe(id) {
        const position = subscribers.findIndex(item => item.id === id);
        if (position !== -1) subscribers.splice(position, 1);
    }
}


