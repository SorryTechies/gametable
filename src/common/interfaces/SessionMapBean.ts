import {ItemBean} from "./ItemBean";
/**
 * Created by LastBerserk on 02.02.2020.
 */

export interface SessionMapBean {
    _id: string;
    size: {x: number, y: number};
    dm_url: string;
    url: string;
    map_objects_id: Array<string>;
    name: string;
    items: {position: {x: number, y: number}, item: ItemBean}
}