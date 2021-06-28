import {Message} from "./message";

export class Chat {
    public uuid!: string;
    public listMessages: Message[] = [];
}
