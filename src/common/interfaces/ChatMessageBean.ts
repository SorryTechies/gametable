/**
 * Created by LastBerserk on 02.02.2020.
 */

export interface ChatMessageBean {
    _id: string;
    text: string;
    sender_id: string;
    target_id: string;
    session_id: string;
    stmp: string;
    is_message: boolean;
}