import {Gallery} from "../model/gallery";
import {GalleryDatabseService} from "./database/gallery-databse-service";
import {Image} from "../model/image";
import {FileService} from "../../../workplace/services/file-service";

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
            const image = await GalleryDatabseService.readImage(uuidImage);

            FileService.readFileBytestream(image.fileUrl)
                .then(myFile => image.fileContent = myFile.fileContent)
                .catch(error => console.log(error));
            return image;
        } catch(error){
            throw new Error('[myfarmer] GalleryService.getImage - Error reading Image with uuid '
                + uuidImage + ', error: ' +
                + error);
        }
    }
}
