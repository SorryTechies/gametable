/**
 * Created by LastBerserk on 27.01.2020.
 */

import MongoController from "../MongoController";

export default class AccountDB {
    /** @return Promise<AccountBean> */
    static getById(id) {
        return MongoController.getById(AccountDB.DB_NAME, id);
    }

    /** @return Promise<AccountBean> */
    static getByUsername(name) {
        return MongoController.getOne(AccountDB.DB_NAME, {[AccountDB.USERNAME_FIELD]: name});
    }

    /**
     * @param {string} character_id
     * @return Promise<AccountBean>
     */
    static findOwner(character_id) {
        return MongoController.getOne(AccountDB.DB_NAME, {[AccountDB.CHARACTERS_FIELD]: [character_id]});
    }

    /**
     * @param {GameSession} game
     * @return Promise<Array<AccountBean>>
     */
    static getParticipantsInGame(game) {
        return MongoController.select(AccountDB.DB_NAME, {[AccountDB.CHARACTERS_FIELD]: game.participants_character_id});
    }

    /**
     * @param {GameSession} game
     * @return Promise<Array<AccountBean>>
     */
    static getParticipantsInGameWithDM(game) {
        return MongoController.select(AccountDB.DB_NAME, {
            $or: [
                {_id: {$in: game.participants_character_id}},
                {_id: game.owner_id}
            ]
        });
    }
}

AccountDB.DB_NAME = "Account";
AccountDB.USERNAME_FIELD = "username";
AccountDB.CHARACTERS_FIELD = "characters_ids";
AccountDB.SESSION_FIELD = "session_ids";