import {NotificationDatabseService} from "./database/notification-databse-service";
import * as WebPush from 'web-push';

export class NotificationService {

    static async activateNotifications(uuidRoleUser: string, notificationSubscription: WebPush.PushSubscription): Promise<boolean> {
        console.log('START: NotificationService.activateNotifications');
        const vapidPublicKey = process.env.VAPID_PUBLIC_KEY!;
        const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY!;

        console.log('Notification Subscription: ' + notificationSubscription);

        WebPush.setVapidDetails(
            'mailto: contact@my-site.com',
            vapidPublicKey,
            vapidPrivateKey,
        );

        const notificationPayload = {
            "notification": {
                "title": "myfarmer - newsletter",
                "body": "Newsletter ist eingetroffen!",
                "icon": "assets/icons/icon-info.svg",
                "vibrate": [100, 50, 100],
                "data": {
                    "dateOfArrival": Date.now(),
                    "primaryKey": 1
                },
                "actions": [{
                    "action": "explore",
                    "title": "Offne den Newsletter"
                }]
            }
        };

        const sendResult = await WebPush.sendNotification(notificationSubscription, JSON.stringify(notificationPayload));
        console.log('Notifikation versendet: ' + JSON.stringify(sendResult));
        return true;

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

        // TODO Fals email geliefert, kann dies als Parameter verwendet werden. Ansonsten muss noch die NewsletterOrder gelesen werden

        try {
            return await NotificationDatabseService.deactivateNotifications(uuidRoleUser);
        } catch(error){
            throw new Error('[myfarmer] NotificationService.deactivateNotifications - Error deactivating notifications vor user: '
                + uuidRoleUser + ', error: ' +
                + error);
        }
    }
}
