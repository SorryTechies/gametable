/**
 * Created by LastBerserk on 28.01.2019.
 */

const DB_NAME = 'gameTableAlkor';
const READ_WRITE = 'readwrite';
const AUTH_TABLE_NAME = 'auth';
const SETTINGS_TABLE_NAME = 'settings';
const USER_FIELD_NAME = 'username';
const KEY_FIELD_NAME = 'key';
const VALUE_FIELD_NAME = 'value';

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

let db = null;

function connect() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 2);
        request.onsuccess = event => {
            console.log('Connected to DB.');
            db = event.target.result;
            return resolve();
        };
        request.onupgradeneeded = async event => {
            await checkData(event.target.result);
            console.log('DB migration completed.');
            db = event.target.result;
            return resolve();
        };
        request.onerror = () => reject("Cannot initialize index db.");
    })
}

async function getTransaction(table) {
    if (db === null) await connect();
    return db.transaction(table, READ_WRITE);
}

async function checkData(db) {
    if (!db.objectStoreNames.contains(AUTH_TABLE_NAME)) {
        db.createObjectStore(AUTH_TABLE_NAME, {keyPath: USER_FIELD_NAME});
    }
    if (!db.objectStoreNames.contains(SETTINGS_TABLE_NAME)) {
        const store = db.createObjectStore(SETTINGS_TABLE_NAME, {keyPath: KEY_FIELD_NAME});
        store.createIndex(VALUE_FIELD_NAME, VALUE_FIELD_NAME, {unique: false});
    }
    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
}

export default class IndexedDDB {
    constructor() {
        if (!('indexedDB' in window))
            throw 'This browser doesn\'t support IndexedDB';
    }

    async getAuth() {
        const tx = await getTransaction(AUTH_TABLE_NAME);
        return new Promise((resolve, reject) => {
            const request = tx.objectStore(AUTH_TABLE_NAME).getAll();
            request.onerror = () => reject();
            request.onsuccess = evt => {
                console.log("Transaction completed: AUTH GET.");
                if (evt.target.result[0]) {
                    resolve(evt.target.result[0].username);
                } else {
                    resolve();
                }
            }
        });
    }

    async saveAuth(username) {
        const tx = await getTransaction(AUTH_TABLE_NAME);
        return new Promise((resolve, reject) => {
            const request = tx.objectStore(AUTH_TABLE_NAME).put({
                [USER_FIELD_NAME]: username
            });
            request.onerror = () => reject();
            request.onsuccess = () => {
                console.log("Transaction completed: AUTH SAVE.");
                resolve();
            }
        });
    }

    async clearAuth() {
        const tx = await getTransaction(AUTH_TABLE_NAME);
        return new Promise((resolve, reject) => {
            const request = tx.objectStore(AUTH_TABLE_NAME).clear();
            request.onerror = reject;
            request.onsuccess = () => {
                console.log("Transaction completed: AUTH CLEAR.");
                resolve();
            }
        })
    }

    async getSettings() {
        const tx = await getTransaction(SETTINGS_TABLE_NAME);
        return new Promise((resolve, reject) => {
            const request = tx.objectStore(SETTINGS_TABLE_NAME).getAll();
            request.onerror = reject;
            request.onsuccess = evt => {
                console.log("Transaction completed: SETTINGS GET.");
                if (evt.target.result) {
                    resolve(evt.target.result);
                } else {
                    resolve();
                }
            }
        });
    }

    async saveSettings(settings) {
        return settings.map(item =>
            new Promise(async (resolve, reject) => {
                const tx = await getTransaction(SETTINGS_TABLE_NAME);
                const request = tx.objectStore(SETTINGS_TABLE_NAME).put(item);
                request.onerror = reject;
                request.onsuccess = () => {
                    console.log("Transaction completed: SETTINGS SAVE.");
                    resolve();
                }
            }));
    }
}