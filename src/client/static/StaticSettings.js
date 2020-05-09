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
const VOLUME_FIELD = "volume";
const EDIT_FIELD = "edit";

const settings = {
    [VOLUME_FIELD]: DEFAULT_VOLUME,
    [EDIT_FIELD]: false
};

const DB_STORED_SETTINGS_LIST = [VOLUME_FIELD];

function saveToDB() {
    new IndexedDDB().saveSettings([
        {key: VOLUME_FIELD, value: settings[VOLUME_FIELD]}
    ]).catch(console.error);
}

const subscribers = [];
export default class StaticSettings {
    static init() {
        new IndexedDDB().getSettings()
            .then(result => settings[VOLUME_FIELD] =
                findSettingValue(result, VOLUME_FIELD, DEFAULT_VOLUME))
            .catch(error => PopupManager.push(JSON.stringify(error)));
    }

    static get(key) {
        return settings[key];
    }

    static set(key, value) {
        settings[key] = value;
        if (DB_STORED_SETTINGS_LIST.includes(key)) saveToDB();
        this.onSettingChanged(key, value);
    }

    static setVolume(value) {
        const v = parseInt(value);
        if (isNaN(v) || v < 0) return;
        settings[VOLUME_FIELD] = v;
        this.set(VOLUME_FIELD, v);
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

StaticSettings.VOLUME = VOLUME_FIELD;
StaticSettings.EDITING_MODE = EDIT_FIELD;
StaticSettings.DEFAULT_VOLUME = DEFAULT_VOLUME;