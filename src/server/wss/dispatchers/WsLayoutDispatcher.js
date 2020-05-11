import MongoController from "../../mongo/MongoController";
import GameObjectDB from "../../mongo/classes/GameObjectDB";

export async function onLayoutChange(message) {
    await MongoController.update(GameObjectDB.DB_NAME,
        {"_id": MongoController.createId(message.data._id)}, {commandButtonLayout: message.data.commandButtonLayout});
}