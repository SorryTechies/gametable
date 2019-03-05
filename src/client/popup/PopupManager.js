/**
 * Created by LastBerserk on 29.01.2019.
 */

let pushCallback = null;
const array = [];

export default class PopupManager {

    static init(ref) {
        pushCallback = ref;
    }

    static push(data, time) {
        if (pushCallback) pushCallback(data, time);
    }
}