/**
 * Created by LastBerserk on 28.01.2019.
 */

const DB_NAME = 'gameTableAlkor';
const READ_WRITE = 'readwrite';
const OBJECT_NAME = 'auth';
const USER_FIELD_NAME = 'username';

const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

let db = null;

function connect() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onsuccess  = event => {
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

async function getTransaction() {
    if (db === null) await connect();
    return db.transaction(OBJECT_NAME, READ_WRITE);
}

async function checkData(db) {
    if (!db.objectStoreNames.contains(OBJECT_NAME)) {
        db.createObjectStore(OBJECT_NAME, {keyPath: USER_FIELD_NAME});
    }
    return new Promise((resolve) => setTimeout(() => resolve(), 1000));
}

export default class IndexedDDB {
    constructor() {
        if (!('indexedDB' in window))
            throw 'This browser doesn\'t support IndexedDB';
    }

    async getAuth() {
        const tx = await getTransaction();
        return new Promise((resolve, reject) => {
            const request = tx.objectStore(OBJECT_NAME).getAll();
            request.onerror = () => reject();
            request.onsuccess  = evt => {
                console.log("Transaction completed: GET.");
                if (evt.target.result[0]) {
                    resolve(evt.target.result[0].username);
                } else {
                    resolve();
                }
            }
        });
    }

    async saveAuth(username) {
        const tx = await getTransaction();
        return new Promise((resolve,
                            reject) => {
            const request = tx.objectStore(OBJECT_NAME).put({
                [USER_FIELD_NAME]: username
            });
            request.onerror = () => reject();
            request.onsuccess  = () => {
                console.log("Transaction completed: SAVE.");
                resolve();
            }
        });
    }

    async clearAuth() {
        const tx = await getTransaction();
        return new Promise((resolve, reject) => {
            const request = tx.objectStore(OBJECT_NAME).clear();
            request.onerror = () => reject();
            request.onsuccess  = () => {
                console.log("Transaction completed: CLEAR.");
                resolve();
            }
        })
    }
}