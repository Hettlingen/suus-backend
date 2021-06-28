import {Message} from "../model/message";

export class ChatService {

    static async sendMessage(message: Message) {
        console.log('Send chat message');
    }
}
