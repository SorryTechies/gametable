/**
 * Created by LastBerserk on 16.03.2019.
 */

let subscribers = [];

export default class StaticClicker {

    static handleClick(event) {
        subscribers.forEach(obj => obj.func(event));
    }

    static subscribe = obj => subscribers.push(obj);

    static unSubscribe(id) {
        const position = subscribers.findIndex(item => item.id === id);
        if (position !== -1) subscribers.splice(position, 1);
    }
}