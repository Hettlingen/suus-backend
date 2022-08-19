import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: functions.config().private.key.replace(/\\n/g, '\n'),
        projectId: functions.config().project.id,
        clientEmail: functions.config().client.email
    }),
    databaseURL: 'https://[your_project_id].firebaseio.com'
})

// admin.database().useEmulator('127.0.0.1', 5001);

const databaseFirestore = admin.firestore()
export { admin, databaseFirestore }
