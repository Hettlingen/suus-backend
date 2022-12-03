import {Notification} from '../../../src/app/features/content-management-system/notifications/model/notification';

export const NOTIFICATION_1 = new Notification();
NOTIFICATION_1.uuid = '1';
NOTIFICATION_1.title = 'Notifikation 1';
NOTIFICATION_1.content = 'Content 1';

export const NOTIFICATION_2 = new Notification();
NOTIFICATION_2.uuid = '1';
NOTIFICATION_2.title = 'Notifikation 2';
NOTIFICATION_2.content = 'Content 2';

export const NOTIFICATION_3 = new Notification();
NOTIFICATION_3.uuid = '1';
NOTIFICATION_3.title = 'Notifikation 3';
NOTIFICATION_3.content = 'Content 3';

export const NOTIFICATIONS = [NOTIFICATION_1, NOTIFICATION_2, NOTIFICATION_3];
