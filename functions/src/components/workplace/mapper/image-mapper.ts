import {Image} from "../../content-management-system/gallery/model/image";

export const mapImagesFromDbToImages = (imagesFromDb: any) => {
    const images: Image[] = [];

    for (const imageFromDb of imagesFromDb) {
        const image = new Image();
        image.uuid = imageFromDb.uuid;
        image.title = imageFromDb.title;
        image.description = imageFromDb.description;
        image.bucketName = imageFromDb.bucketName;
        image.bucketDirectory = imageFromDb.bucketDirectory;
        image.fileName = imageFromDb.fileName;
        // image.dateCreated = imageFromDb.dateCreated;
        // image.dateUpdated = imageFromDb.dateUpdated;
        images.push(image);
    }

    return images;
}

export const mapImageFromDbToImage = (imageFromDb: any) => {
    const image = new Image();
    image.uuid = imageFromDb.uuid;
    image.title = imageFromDb.title;
    image.description = imageFromDb.description;
    image.bucketName = imageFromDb.bucketName;
    image.bucketDirectory = imageFromDb.bucketDirectory;
    image.fileName = imageFromDb.fileName;
    image.url = imageFromDb.urlImage;
    // image.dateCreated = imageFromDb.dateCreated;
    // image.dateUpdated = imageFromDb.dateUpdated;
    return image;
}
