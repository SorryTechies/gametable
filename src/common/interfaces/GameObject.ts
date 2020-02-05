/**
 * Created by LastBerserk on 02.02.2020.
 */

export interface GameObject {
    _id: string;
    position: {x: number, y: number};
    character_id: string;
    initiative: number;
    template_id: string;
    data: object;
    name: string;
}