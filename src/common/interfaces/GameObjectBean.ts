/**
 * Created by LastBerserk on 02.02.2020.
 */
import ButtonLayoutBean from "./ButtonLayoutBean";

export interface GameObjectBean {
    _id: string;
    position: {x: number, y: number};
    character_id: string;
    initiative: number;
    data: object;
    name: string;
    buffs: object;
    effects: Array<object>;
    spells: Array<string>
    items: Array<object>;
    commandButtonLayout: object;
    icon: string;
}