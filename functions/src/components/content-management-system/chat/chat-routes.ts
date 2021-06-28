import {Request, Response} from "express";
import {BotService} from "./services/bot-service";

export class ChatRoutes {
    public static routes(app: any): void {

        // Send a message to dialogflow
        app.route('/chats').post(async (request: Request, response: Response) => {
            BotService.sendMessage(request.body)
                .then(function() {
                    response.status(200).send('Message translated successful in dialogflow');
                }).catch(function(error: any){
                    console.log('Error sendMessage: ' + error);
                    response.status(404).send("Message not successful translated: " + error)
            });
        })
    }
}
