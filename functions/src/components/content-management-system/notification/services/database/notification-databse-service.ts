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
}
