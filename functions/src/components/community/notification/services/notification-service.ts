import {NotificationDatabseService} from "./database/notification-databse-service";

export class NotificationService {

    static async activateNotifications(uuidRoleUser: string): Promise<boolean> {
        console.log('START: NotificationService.activateNotifications');

        try {
            return await NotificationDatabseService.activateNotifications(uuidRoleUser);
        } catch(error){
            throw new Error('[myfarmer] NotificationService.activateNotifications - Error activating notifications for user: '
                + uuidRoleUser + ', error: ' +
                + error);
        }
    }

    static async deactivateNotifications(uuidRoleUser: string): Promise<boolean> {
        console.log('START: NotificationService.deactivateNotifications for user: ' + uuidRoleUser);

        // TODO Fall email geliefert kann dies als Parameter verwendet werden. Ansonsten muss noch die NewsletterOrder gelesen werden

        try {
            return await NotificationDatabseService.deactivateNotifications(uuidRoleUser);
        } catch(error){
            throw new Error('[myfarmer] NotificationService.deactivateNotifications - Error deactivating notifications vor user: '
                + uuidRoleUser + ', error: ' +
                + error);
        }
    }
}
