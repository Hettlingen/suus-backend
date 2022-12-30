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
            return await FileService.saveImageByteStreamToBucket(image);
        } catch (error) {
            // todo in case of an error we have to delete the image in the gcp-bucket
            throw new Error('[ImageService.saveImage] Error save Image with uuid '
                + image.uuid + ', error: '
                + error);
        }
    }

    static async getImageWithoutByteStream(uuidImage: string): Promise<Image> {
        console.log('START: ImageService.getImageWithoutByteStream: ' + uuidImage);
        if (!uuidImage) throw new Error('Image-ID is required');

        try {
            const image = await ImageDatabseService.readImage(uuidImage);
            return image;
        } catch (error) {
            throw new Error('[ImageService.getImageWithoutByteStream] Error reading Image with uuid '
                + uuidImage + ', error: '
                + error);
        }

        throw new Error('[ImageService.getImage] Error reading Image with uuid ' + uuidImage);
    }

    static async getImageWithByteStream(uuidImage: string): Promise<Image> {
        console.log('START: ImageService.getImageWithByteStream: ' + uuidImage);
        if (!uuidImage) throw new Error('Image-ID is required');

        try {
            const image = await ImageDatabseService.readImage(uuidImage);
            image.fileContentAsBase64 = await FileService.readImageAsBase64(image);
            return image;
        } catch (error) {
            throw new Error('[ImageService.getImageWithByteStream] Error reading Image with uuid '
                + uuidImage + ', error: '
                + error);
        }

        throw new Error('[ImageService.getImageWithByteStream] Error reading Image with uuid ' + uuidImage);
    }

    public static async deleteImage(uuidImage: string): Promise<boolean> {
        try {
            const image = await ImageDatabseService.readImage(uuidImage);
            // delete image from the google cloud storage
            await FileService.deleteImageFromBucket(image);
            return await ImageDatabseService.deleteImage(uuidImage);
        } catch (error) {
            throw new Error('[ImageService.deleteImage] Error deleting Image with uuid '
                + uuidImage + ', error: '
                + error);
        }
    }
}
