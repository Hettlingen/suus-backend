import {databaseConnectionPool} from "../../../../../index";
import {Gallery} from "../../model/gallery";
import {Image} from "../../model/image";
import {mapGalleryFromDbToGallery, mapImageFromDbToImage} from "../../mapper/gallery-mapper";

export class GalleryDatabseService {

    static async readGallery(uuidGallery: string): Promise<Gallery> {
        console.log('START: GalleryDatabseService.readGallery: ' + uuidGallery);
        if (!uuidGallery) throw new Error('[myfarmer] GalleryDatabseService.readGallery - Wrong parameters');

        const query = `SELECT Gallery.uuid,
                              Gallery.title,
                              Gallery.description,
                              Gallery.bucketName,
                              Gallery.bucketDirectory,
                              Gallery.dateCreated,
                              Gallery.dateUpdated,
                              Image.uuid uuidOfImage,
                              Image.title titleOfImage,
                              Image.description descriptionOfImage,
                              Image.bucketName bucketNameOfImage,
                              Image.bucketDirectory bucketDirectoryOfImage,
                              Image.fileName fileNameOfImage
                            FROM Gallery 
                            LEFT JOIN Image 
                                ON Gallery.uuid=Image.uuidGallery
                                WHERE Gallery.uuid='${uuidGallery}';`;

        try {
            const galleryFromDb = await databaseConnectionPool.query(query);

            if (galleryFromDb === null || galleryFromDb === undefined) {
                throw new Error('[myfarmer] GalleryDatabseService.readGallery - Gallery doesnt exist on database');
            }

            return mapGalleryFromDbToGallery(galleryFromDb);
        } catch(error) {
            throw new Error('[myfarmer] GalleryDatabseService.readGallery - Error reading gallery from database: ' + error);
        }
    }

    static async readImage(uuidImage: string): Promise<Image> {
        console.log('START: GalleryDatabseService.readImage: ' + uuidImage);
        if (!uuidImage) throw new Error('[myfarmer] GalleryDatabseService.readImage - Wrong parameters');

        const query = `SELECT * FROM Image WHERE Image.uuid='${uuidImage}'`;

        try {
            const imageFromDb = await databaseConnectionPool.query(query);

            if (imageFromDb === null || imageFromDb === undefined) {
                throw new Error('[myfarmer] GalleryDatabseService.readImage - Image doesnt exist on database');
            }

            return mapImageFromDbToImage(imageFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] GalleryDatabseService.readImage - Error reading Image from database: ' + error);
        }
    }

    static async saveImage(image: Image): Promise<boolean> {
        console.log('START: GalleryDatabseService.saveImage: ' + image.uuid + ' to gallery: ' + image.uuidGallery);
        if (!image) throw new Error('[myfarmer] GalleryDatabseService.saveImage - Wrong parameters');

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
            console.log('[myfarmer] GalleryDatabseService.saveImage - Error inserting Image to database: ' + error);
            throw new Error('[myfarmer] GalleryDatabseService.saveImage - Error inserting Image to database: ' + error);
        }
    }

    static async deleteImage(uuidImage: string): Promise<boolean> {
        console.log('START: GalleryDatabseService.deleteImage: ' + uuidImage);
        if (!uuidImage) throw new Error('[myfarmer] GalleryDatabseService.deleteImage - Wrong parameters');

        const query = `DELETE FROM Image WHERE uuid = '${uuidImage}'`;

        try {
            await databaseConnectionPool.query(query);
            return true;
        } catch(error) {
            console.log('[myfarmer] GalleryDatabseService.deleteImage - Error deleting Image from database: ' + error);
            throw new Error('[myfarmer] GalleryDatabseService.deleteImage - Error deleting Image from database: ' + error);
        }
    }
}
