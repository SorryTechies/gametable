/**
 * Created by LastBerserk on 26.01.2019.
 */

const config = require('../../common/config');
const headers = require('../../common/Headers');
import LoginController from "./LoginController";

function getAjax() {
    const request = new XMLHttpRequest();
    request.timeout = 2000;
    return request;
}

export default class NormalRequest {
    constructor() {
        this.method = NormalRequest.METHOD.GET;
        this.path = '';
        this.port = config.SERVER_PORT;
    }

    send(json) {
        return new Promise((resolve, reject) => {
            const request = getAjax();
            request.open(this.method, `http://${window.location.hostname}:${this.port}${this.path}`);
            if (this.method === NormalRequest.METHOD.POST) request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.setRequestHeader(headers.LOGIN_HEADER, LoginController.getLogin());
            if (json) {
                request.send(JSON.stringify(json));
            } else {
                request.send();
            }
            request.onload = () => {
                resolve(JSON.parse(request.response));
            };
            request.error = (e) => reject(e);
            request.ontimeout = () => reject("Request timeout.");
            request.onreadystatechange = (onEvent) => {
                if (request.readyState === 4) {
                    if (request.status !== 200) {
                        try {
                            const error = JSON.parse(request.response).error;
                            if (error) {
                                return reject(`Server returned error: ${error}`);
                            } else {
                                return reject('Unknown error.');
                            }
                        } catch (e) {
                            if (request.response) {
                                return reject(request.response);
                            } else {
                                return reject(`Error trying to send request. Code: ${request.status}!`);
                            }
                        }
                    }
                }
            };
        })
    }
}

NormalRequest.METHOD = {
    GET: "GET",
    POST: "POST"
};