import {NotificationDatabseService} from "./database/notification-databse-service";
import {Notification} from "../model/notification";
import * as WebPush from 'web-push';

export class NotificationService {

    static async getNotifications(uuidUserAccount: string): Promise<Array<Notification>> {
        console.log('START: NotificationService.getNotifications: ' + JSON.stringify(uuidUserAccount));

        try {
            return await NotificationDatabseService.readNotifications(uuidUserAccount);
        } catch(error){
            throw new Error('[NotificationService.getNotifications] Error reading notifications of user: ' + uuidUserAccount);
        }
    }
    static async activateNotifications(uuidRoleUser: string, notificationSubscription: WebPush.PushSubscription): Promise<boolean> {
        console.log('START: NotificationService.activateNotifications');
        // const vapidPublicKey = process.env.VAPID_PUBLIC_KEY!;
        // const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY!;

        console.log('Notification Subscription: ' + notificationSubscription);
        return true;

        // TODO: Save activation to database
        // try {
        //     return await NotificationDatabseService.activateNotifications(uuidRoleUser);
        // } catch(error){
        //     throw new Error('[myfarmer] NotificationService.activateNotifications - Error activating notifications for user: '
        //         + uuidRoleUser + ', error: ' +
        //         + error);
        // }
    }

    static async deactivateNotifications(uuidRoleUser: string): Promise<boolean> {
        console.log('START: NotificationService.deactivateNotifications for user: ' + uuidRoleUser);

        try {
            return await NotificationDatabseService.deactivateNotifications(uuidRoleUser);
        } catch(error){
            throw new Error('[myfarmer] NotificationService.deactivateNotifications - Error deactivating notifications vor user: '
                + uuidRoleUser + ', error: '
                + error);
        }
    }

    static async sendNotificationToClient(notification: Notification, topic: string, registrationToken: string): Promise<boolean> {
        // This registration token comes from the client FCM SDKs.
        // const message = {
        //     notification: {
        //         "title": "myfarmer - newsletter",
        //         "body": "Newsletter ist eingetroffen!",
        //         "icon": "assets/icons/icon-info.svg",
        //         "vibrate": [100, 50, 100],
        //         "data": {
        //             "dateOfArrival": Date.now(),
        //             "primaryKey": 1
        //         },
        //         "actions": [{
        //             "action": "explore",
        //             "title": "Offne den Newsletter"
        //         }]
        //     },
        //     data: {
        //         score: '850',
        //         time: '2:45'
        //     },
        //     topic: topic,
        //     token: registrationToken
        // };
        // Send a message to the device corresponding to the provided registration token.
        // getMessaging().send(message)
        //     .then((response) => {
        //         // Response is a message ID string.
        //         console.log('Successfully sent message:', response);
        //         return true;
        //     })
        //     .catch((error) => {
        //         console.log('Error sending message:', error);
        //         return false;
        //     });
        return false;
    }

    static async sendNotificationToMultipleClients(notification: Notification, topic: string, listRegistrationTokens: string[]): Promise<boolean> {
        // This registration token comes from the client FCM SDKs.
        // const message = {
        //     notification: {
        //         "title": "myfarmer - newsletter",
        //         "body": "Newsletter ist eingetroffen!",
        //         "icon": "assets/icons/icon-info.svg",
        //         "vibrate": [100, 50, 100],
        //         "data": {
        //             "dateOfArrival": Date.now(),
        //             "primaryKey": 1
        //         },
        //         "actions": [{
        //             "action": "explore",
        //             "title": "Offne den Newsletter"
        //         }]
        //     },
        //     data: {
        //         score: '850',
        //         time: '2:45'
        //     },
        //     topic: topic,
        //     tokens: listRegistrationTokens
        // };

        // Send a message to the multiple devices corresponding to the provided registration tokens.
        // getMessaging().sendMulticast(message)
        //     .then((response) => {
        //         // Response is a message ID string.
        //         console.log('Successfully sent message:', response);
        //         return true;
        //     })
        //     .catch((error) => {
        //         console.log('Error sending message:', error);
        //         return false;
        //     });
        return false;
    }
}
