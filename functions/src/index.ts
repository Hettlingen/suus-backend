import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import {Routes} from "./routes";

admin.initializeApp(functions.config().firebase);
export const database = admin.firestore();

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);

app.get('/warmup', (request, response) => {
    response.send('Hello SCOOP Backend');
})

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', 'true');

    const whitelistOrigins = [
        'http://localhost:4200',
        'https://myfarmer-3000.web.app',
        'https://swiss-draft.web.app'];
    const origin = req.get('origin');
    whitelistOrigins.forEach(function(value){
        if (origin && origin.indexOf(value) > -1){
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
    })
    next();
});

Routes.routes(app);