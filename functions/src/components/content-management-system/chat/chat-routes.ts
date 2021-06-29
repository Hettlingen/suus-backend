import {Request, Response} from "express";
import {BotService} from "./services/bot-service";
import {Message} from "./model/message";

export class ChatRoutes {
    public static routes(app: any): void {

        // Send a message to dialogflow
        app.route('/chats').post(async (request: Request, response: Response) => {
            BotService.sendMessage(request.body)
                .then(function(responseMessage: Message) {
                    response.status(200).send(responseMessage);
                }).catch(function(error: any){
                    console.log('Message not successful translated: ' + error);
                    response.status(404).send("Message not successful translated: " + error)
            });
        })
    }
}
