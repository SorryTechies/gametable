/**
 * Created by LastBerserk on 02.02.2020.
 */

export interface GameSession {
    _id: string;
    owner_id: string;
    participants_character_id: Array<string>;
    session_maps_id: Array<string>
}