import { Message } from "./Message";

export type Friend = {
    id: string;
    name: string;
    lastName: string;
    phone: string;
    currentMessage?: string;
}