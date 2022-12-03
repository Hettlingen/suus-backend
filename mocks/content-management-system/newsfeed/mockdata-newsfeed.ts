import {Feed} from '../../../src/app/features/content-management-system/newsfeed/model/feed';

export const FEED_1 = new Feed();
FEED_1.uuid = '1';
FEED_1.title = 'Notifikation 1';
FEED_1.content = 'Content 1';

export const FEED_2 = new Feed();
FEED_2.uuid = '1';
FEED_2.title = 'Notifikation 2';
FEED_2.content = 'Content 2';

export const FEED_3 = new Feed();
FEED_3.uuid = '1';
FEED_3.title = 'Notifikation 3';
FEED_3.content = 'Content 3';

export const NEWSFEED = [FEED_1, FEED_2, FEED_3];
