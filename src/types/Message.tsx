import { Moment } from "moment";

export type Message = {
    id: string;
    text: string;
    date: Moment;
    author: string;
}