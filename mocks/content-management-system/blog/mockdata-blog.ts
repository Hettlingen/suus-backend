import {Person} from '../../../src/app/features/identity-access-management/model/person';
import {Post} from '../../../src/app/features/content-management-system/features/blog/model/post';
import {Blog} from '../../../src/app/features/content-management-system/features/blog/model/blog';


export const AUTHOR_1 = new Person();
AUTHOR_1.uuid = '1';
AUTHOR_1.firstName = 'Martin';
AUTHOR_1.lastName = 'Braun';
AUTHOR_1.age = 51;

export const AUTHOR_2 = new Person();
AUTHOR_1.uuid = '2';
AUTHOR_1.firstName = 'Sibylle';
AUTHOR_1.lastName = 'Kunz';
AUTHOR_1.age = 48;

export const POST_1 = new Post();
POST_1.uuid = '1';
POST_1.title = 'Die SUUS Idee - Leidenschaft ist unser Antrieb';
POST_1.content = 'Wie so oft ist eine Reise die Geburtsstunde von SUUS. Im schönen Costa Rica, nahe an der Pazifikküste entdeckte ich und meine Frau eine wunderschöne Unterkunft. Als Begrüssung erhielten wir ein Getränk, das uns alle Sinne raubte.';
POST_1.duration = 3;
POST_1.imageName = 'post-suus-idea.png';
POST_1.dateCreated = new Date();
POST_1.datePublished = new Date();
POST_1.author = AUTHOR_1;

export const POST_2 = new Post();
POST_2.uuid = '2';
POST_2.title = 'Der Tamarindenkönig';
POST_2.content = 'Die Tamarinde ist eine wunderbare Frucht, die sowohl süss wie auch etwas sauer schmeckt. Einmal aus ihrem geheimnisvollen Verpackung befreit, offenbart sie' +
  'ihren wohltuenden Geschmack. Die Tamarinde wird in vielen Kultur nicht nur für erfrischende Getränke sondern auch beim Kochen oft verwendet.' +
  '\n' +
  'Davide, unser Partner aus Sambia, sorgt mit seinem Team für dafür, dass wir jederzeit biologische und reife Tamarinden für unseren berühmten Tamarindensaft zur Verfügung haben.';
POST_2.duration = 5;
POST_2.imageName = 'post-tamarind-king.png';
POST_2.dateCreated = new Date();
POST_2.datePublished = new Date();
POST_2.author = AUTHOR_1;

export const POST_3 = new Post();
POST_3.uuid = '3';
POST_3.title = 'Nachhaltigkeit von SUUS';
POST_3.content = 'Wir von granini wollen den Unterschied machen – für dich und uns. Deswegen ist das Thema Nachhaltigkeit mit all seinen unterschiedlichen Facetten ' +
  'unser gemeinsames Anliegen. Mit dem großen Engagement unserer Mitarbeiterinnen und Mitarbeiter leben wir Nachhaltigkeit schon jetzt jeden Tag und verstehen uns ' +
  'selbst als Umweltschutz- und Qualitätsbeauftragte. Auf unseren Fluren spürst du nicht nur die Begeisterung fürs Leben und für den Genuss, sondern auch eine ordentliche ' +
  'Portion nachhaltigen Spirit! Denn bei granini zu arbeiten soll jeden von uns stolz machen, mit seiner Arbeit etwas Gutes zu tun – für Mensch und Natur.\n' +
  '\n' +
  'Gemeinsam möchten wir noch nachhaltiger werden und haben uns dafür ambitionierte Ziele gesetzt. Überzeuge dich selbst von dem, was wir bereits erreicht haben, und ' +
  'von dem, was wir noch erreichen möchten. Und zwar in den Bereichen, die für uns als Fruchtsaftmarke am wichtigsten sind: dem nachhaltigen Anbau unserer Rohstoffe, ' +
  'unseren Säften, deren Verpackungen und klimaneutralem Wirtschaften.';
POST_3.duration = 4;
POST_3.imageName = 'post-sustainability.png';
POST_3.dateCreated = new Date();
POST_3.datePublished = new Date();
POST_3.author = AUTHOR_2;

export const BLOG_1 = new Blog();
BLOG_1.uuid = '1';
BLOG_1.title = 'Alles Wissenswerte über biologische Produkte';
BLOG_1.description = 'Tauchen Sie ein in spannende Beiträge rund um die Produktion und Verarbeitung von biologischen Produkten. Natürlich geben wir euch auch nützliche Hinweise, wie ihr euren Alltag möglichst nachhaltig bewältigen könnt.';
BLOG_1.listPost = [POST_1, POST_2, POST_3];
