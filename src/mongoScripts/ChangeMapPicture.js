/**
 * Created by LastBerserk on 04.02.2020.
 */

import MongoController from "../server/mongo/MongoController";
import SessionMapDB from "../server/mongo/classes/SessionMapDB";

(async () => {
    await MongoController.init();
    await MongoController.update(SessionMapDB.DB_NAME, {name: "test_map"}, {url: "/maps/Cadia.bmp"});
    await MongoController.update(SessionMapDB.DB_NAME, {name: "test_map"}, {dm_url: "/maps/Cadia.bmp"});
})().catch(console.error);
