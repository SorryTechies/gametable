/**
 * Created by LastBerserk on 10.12.2019.
 */

const subscribers = {};
export default class StaticKeyboardController {
    static subscribe(key, func) {
        if (!Array.isArray(subscribers[key])) subscribers[key] = [];
        if (!subscribers[key].find(func)) subscribers[key].push(func);
    }

    static unsubscribe(key, func) {
        if (!Array.isArray(subscribers[key])) return;
        const index = subscribers[key].findIndex(func);
        if (index !== -1) subscribers[key].splice(index, 1);
    }

    static onKeyPressed(event) {
        const key = event.which || event.keyCode;
        if (!Array.isArray(subscribers[key])) return;
        subscribers[key].forEach(func => {
            if (typeof func === "function") func();
        });
    }
}

StaticKeyboardController.ESCAPER = 27;
StaticKeyboardController.ENTER = 13;