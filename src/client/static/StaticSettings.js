/**
 * Created by LastBerserk on 16.05.2019.
 */

import IndexedDDB from "../db/IndexedDDB";
import PopupManager from "../popup/PopupManager";

function findSettingValue(settings, name, defValue) {
    const setting = settings.find(item => item.key === name);
    if (setting) {
        return setting.value;
    } else {
        return defValue;
    }
}

const DEFAULT_VOLUME = 2;
let volume = DEFAULT_VOLUME;

function saveSettings() {
    new IndexedDDB().saveSettings([{key: StaticSettings.VOLUME, value: volume}]).catch(console.error);
}

const subscribers = [];
export default class StaticSettings {
    static init() {
        new IndexedDDB().getSettings()
            .then(result => volume = findSettingValue(result, StaticSettings.VOLUME, StaticSettings.DEFAULT_VOLUME))
            .catch(error => PopupManager.push(JSON.stringify(error)));
    }

    static getVolume() {
        return volume;
    }

    static setVolume(value) {
        const v = parseInt(value);
        if (isNaN(v) || v < 0) return;
        volume = v;
        saveSettings();
        this.onSettingChanged(StaticSettings.VOLUME, volume);
    }

    static onSettingChanged(settingName, newValue) {
        [...subscribers].forEach(obj => {
            if (obj.name === settingName) obj.func(newValue);
        });
    }

    static subscribe = obj => subscribers.push(obj);

    static unSubscribe(obj) {
        const position = subscribers.findIndex(item => item === obj);
        if (position !== -1) subscribers.splice(position, 1);
    }
}

StaticSettings.VOLUME = "volume";
StaticSettings.DEFAULT_VOLUME = DEFAULT_VOLUME;