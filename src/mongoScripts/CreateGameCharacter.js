/**
 * Created by LastBerserk on 04.02.2020.
 */

import MongoController from "../server/mongo/MongoController";
import GameObjectDB from "../server/mongo/classes/GameObjectDB";
import CharacterDB from "../server/mongo/classes/CharacterDB";
import SessionMapDB from "../server/mongo/classes/SessionMapDB";
import RuleConstants from "../client/rules/constants/RuleStatConstants";

(async () => {
    await MongoController.init();
    const gameObject = (await MongoController.insert(CharacterDB.DB_NAME, [
        {
            [CharacterDB.NAME_FIELD]: "Rat slave",
            [CharacterDB.DATA_FIELD]: {
                [RuleConstants.MODIFIER_SAVE_REFLEX]: 2,
                [RuleConstants.MODIFIER_SAVE_WILL]: 2,

                [RuleConstants.STAT_STRENGTH]: 2,
                [RuleConstants.HEALTH_DIE]: 8,
                [RuleConstants.LEVEL]: 1
            }
        }
    ]))[0];
})().catch(console.error);
