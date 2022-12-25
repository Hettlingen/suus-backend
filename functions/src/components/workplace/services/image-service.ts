import {v4 as uuidGenerator} from 'uuid';
import {FileService} from "./utils/file-service";
import {FileHelper} from "./utils/file-helper";
import {Image} from "../../content-management-system/gallery/model/image";
import {ImageDatabseService} from "./database/image-databse-service";

export class ImageService {

    public static async saveImage(image: Image): Promise<boolean> {
        try {
            image.uuid = uuidGenerator();
            image.fileName = FileHelper.createFileName(image);
            // save image to the Google cloud storage
            return await FileService.saveImage(image);
        } catch (error) {
            // todo in case of an error we have to delete the image in the gcp-bucket
            throw new Error('[GalleryService.saveImage] Error save Image with uuid '
                + image.uuid + ', error: '
                + error);
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
            throw new Error('[GalleryService.getImage] Error reading Image with uuid '
                + uuidImage + ', error: '
                + error);
        }

        throw new Error('[GalleryService.getImage] Error reading Image with uuid ' + uuidImage);
    }

    public static async deleteImage(uuidImage: string): Promise<boolean> {
        try {
            const image = await ImageDatabseService.readImage(uuidImage);
            // delete image from the google cloud storage
            await FileService.deleteImage(image);
            return await ImageDatabseService.deleteImage(uuidImage);
        } catch (error) {
            throw new Error('[GalleryService.deleteImage] Error deleting Image with uuid '
                + uuidImage + ', error: '
                + error);
        }
    }
}
