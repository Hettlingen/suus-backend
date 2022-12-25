import {databaseConnectionPool} from "../../../../index";
import {Image} from "../../../content-management-system/gallery/model/image";
import {mapImageFromDbToImage} from "../../mapper/image-mapper";


export class ImageDatabseService {

    static async saveImage(image: Image): Promise<boolean> {
        console.log('START: GalleryDatabseService.saveImage: ' + image.uuid + ' to gallery: ' + image.uuidGallery);
        if (!image) throw new Error('[GalleryDatabseService.saveImage] Wrong parameters');

        const query = `INSERT INTO Image(
                  uuid,
                  uuidGallery,
                  title,
                  fileName,
                  bucketName,
                  bucketDirectory,
                  mimeType)
                  VALUES ('${image.uuid}',
                          '${image.uuidGallery}',
                          '${image.title}', 
                          '${image.fileName}',
                          '${image.bucketName}',
                          '${image.bucketDirectory}',
                          '${image.mimeType}')`;

        try {
            await databaseConnectionPool.query(query);
            return true;
        } catch(error) {
            console.log('[GalleryDatabseService.saveImage] Error inserting Image to database: ' + error);
            throw new Error('[GalleryDatabseService.saveImage] Error inserting Image to database: ' + error);
        }
    }

    static async readImage(uuidImage: string): Promise<Image> {
        console.log('START: GalleryDatabseService.readImage: ' + uuidImage);
        if (!uuidImage) throw new Error('[GalleryDatabseService.readImage] Wrong parameters');

        const query = `SELECT * FROM Image WHERE Image.uuid='${uuidImage}'`;

        try {
            const imageFromDb = await databaseConnectionPool.query(query);

            if (imageFromDb === null || imageFromDb === undefined) {
                throw new Error('[GalleryDatabseService.readImage] Image doesnt exist on database');
            }

            return mapImageFromDbToImage(imageFromDb[0]);
        } catch(error) {
            throw new Error('[GalleryDatabseService.readImage] Error reading Image from database: ' + error);
        }
    }

    static async deleteImage(uuidImage: string): Promise<boolean> {
        console.log('START: GalleryDatabseService.deleteImage: ' + uuidImage);
        if (!uuidImage) throw new Error('[GalleryDatabseService.deleteImage] Wrong parameters');

        const query = `DELETE FROM Image WHERE uuid = '${uuidImage}'`;

        try {
            await databaseConnectionPool.query(query);
            return true;
        } catch(error) {
            console.log('[GalleryDatabseService.deleteImage] Error deleting Image from database: ' + error);
            throw new Error('[GalleryDatabseService.deleteImage] Error deleting Image from database: ' + error);
        }
    }
}
