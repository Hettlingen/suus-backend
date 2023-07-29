import {Notification} from "../model/notification";
import {Partner} from "../../../identity-access-management/partner/model/partner";

export const mapNotificationsFromDbToNotifications = (notificationsFromDb: any) => {
    const notifications: Notification[] = [];

    for (const notificationFromDb of notificationsFromDb) {
        const notification = new Notification();
        notification.uuid = notificationFromDb.uuid;
        notification.author= mapPersonAuthorFromDbToPerson(notificationFromDb);
        notification.recipient= mapPersonRecipientFromDbToPerson(notificationFromDb);
        notifications.push(notification);
    }

    return notifications;
}

export const mapPersonAuthorFromDbToPerson = (notificationFromDb: any) => {
    const partner = new Partner();
    partner.uuid = notificationFromDb.uuidOfPersonAuthor;
    partner.firstName = notificationFromDb.firstNameOfPersonAuthor;
    partner.lastName = notificationFromDb.lastNameOfPersonAuthor;
    return partner;
}

export const mapPersonRecipientFromDbToPerson = (notificationFromDb: any) => {
    const partner = new Partner();
    partner.uuid = notificationFromDb.uuidOfPersonRecipient;
    partner.firstName = notificationFromDb.firstNaemOfPersonRecipient;
    partner.lastName = notificationFromDb.lastNameOfPersonRecipient;
    return partner;
}
