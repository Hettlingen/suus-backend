import * as functions from 'firebase-functions';
import {initializeApp} from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as mysql from 'promise-mysql';
import {Routes} from "./routes";
import * as dotenv from 'dotenv';

// read configuration files
if (process.env.NODE_ENV !== 'production') {
    dotenv.config(); // config the *.env files
}

// initialize firebase
const admin = require("firebase-admin");
// const serviceAccount = require('../configuration/firebase-admin-private-key-for-suus-backend.json');
// initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://scoop-backend-3000.firebaseio.com"
// });
initializeApp();

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);

// Initialize CORS ------------------------------------------------
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

Routes.routes(app);

// Initialize Database GOOGLE FIRESTORE ------------------------------------------
export const databaseFirestore = admin.firestore();
// END Database GOOGLE FIRESTORE -------------------------------------------------

// Initialize Database GOOGLE CLOUD MYSQL ----------------------------------------
export let database: any;

const databaseLocation = 'remote';
const createPool = async () => {
    // @ts-ignore
    if (databaseLocation === 'remote') {
        database = await mysql.createPool({
            user: 'root',
            password: 'scoop',
            database: 'SCOOP-SCHEMA',
            // If connecting via unix domain socket, specify the path
            socketPath: '/cloudsql/scoop-backend-3000:europe-west6:scoop-database-8-0',

            // [START cloud_sql_mysql_mysql_limit]
            // 'connectionLimit' is the maximum number of connections the pool is allowed
            // to keep at once.
            connectionLimit: 5,
            // [END cloud_sql_mysql_mysql_limit]

            // [START cloud_sql_mysql_mysql_timeout]
            // 'connectTimeout' is the maximum number of milliseconds before a timeout
            // occurs during the initial connection to the database.
            connectTimeout: 10000, // 10 seconds
            // 'acquireTimeout' is the maximum number of milliseconds to wait when
            // checking out a connection from the pool before a timeout error occurs.
            acquireTimeout: 10000, // 10 seconds
            // 'waitForConnections' determines the pool's action when no connections are
            // free. If true, the request will queued and a connection will be presented
            // when ready. If false, the pool will call back with an error.
            waitForConnections: true, // Default: true
            // 'queueLimit' is the maximum number of requests for connections the pool
            // will queue at once before returning an error. If 0, there is no limit.
            queueLimit: 0, // Default: 0
            // [END cloud_sql_mysql_mysql_timeout]

            // [START cloud_sql_mysql_mysql_backoff]
            // The mysql module automatically uses exponential delays between failed
            // connection attempts.
            // [END cloud_sql_mysql_mysql_backoff]

            //[END_EXCLUDE]
        });
    } else {
        database = await mysql.createPool({
            user: 'root',
            password: 'scoop',
            database: 'SCOOP-SCHEMA',

            host: 'localhost',
            port: 3306,

            connectionLimit: 5,
            connectTimeout: 10000, // 10 seconds
            acquireTimeout: 10000, // 10 seconds
            waitForConnections: true, // Default: true
            queueLimit: 0, // Default: 0
        });
    }
};

createPool()
    .then((value) => {console.log('[myFarmer] Database pool erstellt')})
    .catch((error) => {console.log('[myFarmer] Fehler beim Erstellen des Pools')});

// END Database GOOGLE CLOUD MYSQL ----------------------------------------

// Initialize STRIPE PAYMENT ----------------------------------------------
// const secret = process.env.STRIPE_KEY!;
// export const stripe = new Stripe(secret, null);
// END Database STRIPE PAYMENT --------------------------------------------

// we need that for the handling with google cloud storage
const multer = require('multer')
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
})
app.use(multerMid.single('file'));
