/**
 * Created by LastBerserk on 02.02.2020.
 */

export interface AccountBean {
    _id: string;
    username: string;
    session_ids: Array<string>;
    characters_ids: Array<string>;
}