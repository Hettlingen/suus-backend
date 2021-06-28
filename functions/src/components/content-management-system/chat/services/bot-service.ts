import {Message} from "../model/message";
import uuid = require("uuid");

const {SessionsClient} = require('@google-cloud/dialogflow-cx');

export class BotService {

    static async sendMessage(message: Message) {
        // A unique identifier for the given session
        const sessionId = uuid.v4();
        const location = 'global';

        // Create a new session
        const client = new SessionsClient()
        const sessionPath = client.projectLocationAgentSessionPath(
            'scoop-backend-3000',
            location,
            'myfarmer-dialogflow',
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
        const responses = await client.detectIntent(request);

        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
        } else {
            console.log(`  No intent matched.`);
        }
    }
}
