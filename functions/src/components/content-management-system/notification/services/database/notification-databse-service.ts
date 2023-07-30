import {databaseConnectionPool} from "../../../../../index";
import {Notification} from "../../model/notification";
import {mapNotificationsFromDbToNotifications} from "../../mapper/notification-mapper";

export class NotificationDatabseService {

    static async activateNotifications(uuidRoleUser: string): Promise<boolean> {
        console.log('START: NewsletterDatabseService.createNewsletter');
        if (!uuidRoleUser) throw new Error('[myfarmer] NotificationDatabseService.activateNotifications - Wrong parameters');
        return true;
    }

    static async deactivateNotifications(uuidRoleUser: string): Promise<boolean> {
        console.log('START: NewsletterDatabseService.readNewsletter: ' + JSON.stringify(uuidRoleUser));
        if (!uuidRoleUser) throw new Error('[myfarmer] NotificationDatabseService.deactivateNotifications - Wrong parameters');
        return true;
    }

    static async readNotifications(uuidUserAccount: string): Promise<Array<Notification>> {
        console.log('[NotificationDatabseService.readNotifications] START: ' + uuidUserAccount);
        if (!uuidUserAccount) throw new Error('[NotificationDatabseService.readNotifications] Wrong parameters');

        const query = `SELECT Notification.uuid,
                              Notification.title,
                              Notification.message,
                              Partner.uuid uuidOfPersonRecipient,
                              Partner.firstName firstNaemOfPersonRecipient,
                              Partner.lastName lastNameOfPersonRecipient
                            FROM Notification
                            LEFT JOIN UserAccount
                                 ON Notification.uuidUserAccount=UserAccount.uuid
                            LEFT JOIN Partner
                                 ON UserAccount.uuidPartner=Partner.uuid
                            WHERE Notification.uuidUserAccount='${uuidUserAccount}';`;

        try {
            const notificationsFromDb = await databaseConnectionPool.query(query);

            if (notificationsFromDb === null || notificationsFromDb === undefined) {
                throw new Error('[NotificationDatabseService.readNotifications] Notifications dont exist on database');
            }

            return mapNotificationsFromDbToNotifications(notificationsFromDb);
        } catch(error) {
            console.log('[NotificationDatabseService.readNotifications] Error reading notifications from database: ' + error);
            throw new Error('[NotificationDatabseService.readNotifications] Error reading notifications from database: ' + error);
        }
    }
}
