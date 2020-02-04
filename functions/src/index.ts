import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as mysql from 'promise-mysql';
import {Routes} from "./routes";

admin.initializeApp(functions.config().firebase);

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
export let databaseShop: any;
export let databaseUserAccount: any;
export let databaseBlog: any;

const createPool = async () => {
    databaseShop = await mysql.createPool({
        user: 'root',
        password: 'scoop',
        database: 'shop',
        // If connecting via unix domain socket, specify the path
        socketPath: '/cloudsql/scoop-backend-3000:europe-west1:scoop-database',

        // If connecting via TCP, enter the IP and port instead
        // host: 'localhost',
        // port: 3306,

        //[START_EXCLUDE]

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
    databaseUserAccount = await mysql.createPool({
        user: 'root',
        password: 'scoop',
        database: 'user',
        socketPath: '/cloudsql/scoop-backend-3000:europe-west1:scoop-database',
        connectionLimit: 5,
        connectTimeout: 10000, // 10 seconds
        acquireTimeout: 10000, // 10 seconds
        waitForConnections: true, // Default: true
        queueLimit: 0, // Default: 0
    });
    databaseBlog = await mysql.createPool({
        user: 'root',
        password: 'scoop',
        database: 'blog',
        socketPath: '/cloudsql/scoop-backend-3000:europe-west1:scoop-database',
        connectionLimit: 5,
        connectTimeout: 10000, // 10 seconds
        acquireTimeout: 10000, // 10 seconds
        waitForConnections: true, // Default: true
        queueLimit: 0, // Default: 0
    });
};

createPool()
    .then((value) => {console.log('[myFarmer] Database pool erstellt')})
    .catch((error) => {console.log('[myFarmer] Fehler beim Erstellen des Pools')});

// END Database GOOGLE CLOUD MYSQL ----------------------------------------