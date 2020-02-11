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

function queryToString(query) {
    let ans = Object.keys(query).reduce((acc, key) => {
        if (acc) acc += ";";
        return acc + `${key}=${query[key]}`;
    }, "");
    if (ans) ans = '?' + ans;
    return ans;
}

export default class NormalRequest {
    /**
     * @param {string} [path]
     * @param {{}} [query]
     */
    constructor(path, query) {
        this.method = NormalRequest.METHOD.GET;
        this.path = path ? path : '';
        this.query = query ? query : {};
        this.port = config.SERVER_PORT;
    }

    setHeaders(request) {
        if (this.method === NormalRequest.METHOD.POST) request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (LoginController.getLogin()) request.setRequestHeader(headers.LOGIN_HEADER, LoginController.getLogin());
        if (LoginController.getSession()) request.setRequestHeader(headers.X_SESSION_HEADER, LoginController.getSession());
    }

    send(json) {
        return new Promise((resolve, reject) => {
            const request = getAjax();
            if (json && this.method === NormalRequest.METHOD.GET) this.method= NormalRequest.METHOD.POST;
            request.open(this.method, `http://${window.location.hostname}:${this.port}${this.path}${queryToString(this.query)}`);
            this.setHeaders(request);
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