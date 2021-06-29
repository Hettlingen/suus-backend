import {Message} from "../model/message";
import uuid = require("uuid");

const {SessionsClient} = require('@google-cloud/dialogflow-cx');

export class BotService {

    static async sendMessage(message: Message): Promise<Message> {
        // A unique identifier for the given session
        const sessionId = uuid.v4();
        const location = 'global';

        // Create a new session
        const client = new SessionsClient()
        const sessionPath = client.projectLocationAgentSessionPath(
            'scoop-backend-3000',
            location,
            'c08f919c-0164-4610-bf4e-677ab284e70c',
            sessionId
        );

        console.log('Session Path: ' + sessionPath);

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: message.content,
                },
                // The language used by the client (en-US)
                languageCode: 'de',
            },
        };

        // Send request and log result
        const [response] = await client.detectIntent(request);
        const responseMessage = new Message();
        responseMessage.avatar = 'farmy.svg';

        for (const messageOfResponse of response.queryResult.responseMessages) {
            if (messageOfResponse.text) {
                responseMessage.content = responseMessage.content.concat(messageOfResponse.text.text);
            }
        }

        if (response.queryResult.match.intent) {
            console.log(`>>>>> Matched Intent: ${response.queryResult.match.intent.displayName}`);
        }
        console.log(`>>>>> Current Page: ${response.queryResult.currentPage.displayName}`);

        return responseMessage;
    }
}
