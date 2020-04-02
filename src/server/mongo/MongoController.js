/**
 * Created by LastBerserk on 27.01.2020.
 */

import * as MongoDB from "mongodb";

const MongoClient = MongoDB.MongoClient;
const ObjectId = MongoDB.ObjectID;

const DB_NAME = 'game_table';
const DB_URL = 'mongodb://localhost:27017';

let client = null;
let db = null;

function throwIfNotInit() {
    if (!MongoController.isInit()) throw new Error("Db wasn't initialized");
}

export default class MongoController {
    static async init() {
        client = await MongoClient.connect(DB_URL);
        console.log("Connected to MongoDB on " + DB_URL);
        db = client.db(DB_NAME);
        if (!db) throw new Error("No database " + DB_NAME + " found");
        console.log("Database " + DB_NAME + " selected");
    }

    static isInit() {
        return client && db;
    }

    static select(name, query = {}) {
        throwIfNotInit();
        return db.collection(name).find(query).toArray();
    }

    static getOne(name, query) {
        throwIfNotInit();
        return db.collection(name).findOne(query);
    }

    static getById(name, id) {
        throwIfNotInit();
        if (typeof id === "string") id = ObjectId(id);
        return MongoController.getOne(name, {_id: id});
    }

    static insert(name, arr) {
        throwIfNotInit();
        return db.collection(name).insertMany(arr).then(result => result.ops);
    }

    static updateRaw(name, query, obj) {
        throwIfNotInit();
        return db.collection(name).updateMany(query, obj);
    }

    static update(name, query, setObj) {
        return MongoController.updateRaw(name, query, {$set: setObj});
    }

    static pushInto(name, query, setObj) {
        throwIfNotInit();
        return db.collection(name).updateMany(query, {$push: setObj});
    }

    static aggregate(name, query) {
        throwIfNotInit();
        return db.collection(name).aggregate(query).toArray();
    }

    static remove(name, query) {
        throwIfNotInit();
        return db.collection(name).deleteMany(query);
    }

    static createId(str) {
        return MongoDB.ObjectID(str);
    }
}