import {Gallery} from "../model/gallery";
import {GalleryDatabseService} from "./database/gallery-databse-service";
import {Image} from "../model/image";
import { v4 as uuidGenerator } from 'uuid';
import {FileHelper} from "../../../workplace/services/utils/file-helper";
import {FileService} from "../../../workplace/services/utils/file-service";
import {ImageDatabseService} from "../../../workplace/services/database/image-databse-service";

export class GalleryService {

    static async getGallery(uuidGallery: string): Promise<Gallery> {
        console.log('START: GalleryService.getGallery: ' + uuidGallery);
        if (!uuidGallery) throw new Error('Gallery-ID is required');

        try {
            return await GalleryDatabseService.readGallery(uuidGallery);
        } catch(error){
            throw new Error('[myfarmer] GalleryService.getGallery - Error reading Gallery' + error);
        }
    }

    static async getImage(uuidImage: string): Promise<Image> {
        console.log('START: GalleryService.getImage: ' + uuidImage);
        if (!uuidImage) throw new Error('Image-ID is required');

        try {
            const image = await ImageDatabseService.readImage(uuidImage);
            image.fileContentAsBase64 = await FileService.readImageAsBase64(image);
            return image;
        } catch (error) {
            throw new Error('[myfarmer] GalleryService.getImage - Error reading Image with uuid '
                + uuidImage + ', error: '
                + error);
        }

        throw new Error('[myfarmer] GalleryService.getImage - Error reading Image with uuid ' + uuidImage);
    }

    public static async saveImage(uuidGallery: string, image: Image): Promise<boolean> {
        try {
            image.uuid = uuidGenerator();
            image.uuidGallery = uuidGallery;
            image.fileName = FileHelper.createFileName(image);

            // save image to the google cloud storage
            await FileService.saveImage(image);
            return await ImageDatabseService.saveImage(image);
        } catch (error) {
            // todo in case of an error we have to delete the image in the gcp-bucket
            throw new Error('[myfarmer] GalleryService.saveImage - Error save Image with uuid '
                + image.uuid + ', error: '
                + error);
        }
    }

    public static async deleteImage(uuidImage: string): Promise<boolean> {
        try {
            const image = await ImageDatabseService.readImage(uuidImage);
            // delete image from the google cloud storage
            await FileService.deleteImage(image);
            return await ImageDatabseService.deleteImage(uuidImage);
        } catch (error) {
            throw new Error('[myfarmer] GalleryService.deleteImage - Error deleting Image with uuid '
                + uuidImage + ', error: '
                + error);
        }
    }
}
