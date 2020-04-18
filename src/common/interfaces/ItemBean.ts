/**
 * Created by LastBerserk on 23.03.2020.
 */

export interface ItemBean {
    id: string;
    key: string;

    toDelete?: boolean;
    damaged?: number;
    slot?: number;
}