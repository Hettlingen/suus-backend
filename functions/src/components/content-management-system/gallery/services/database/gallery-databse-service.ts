import {databaseConnectionPool} from "../../../../../index";
import {Gallery} from "../../model/gallery";
import {mapGalleryFromDbToGallery} from "../../mapper/gallery-mapper";

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
                              Image.fileName fileNameOfImage,
                              Image.urlImage urlImageOfImage
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
}
