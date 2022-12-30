import {Gallery} from "../model/gallery";
import {Image} from "../model/image";

export const mapGalleryFromDbToGallery = (galleryFromDb: any) => {
    const gallery = new Gallery();
    gallery.uuid = galleryFromDb[0].uuid;
    gallery.title = galleryFromDb[0].title;
    gallery.description = galleryFromDb[0].description;
    gallery.bucketName = galleryFromDb[0].bucketName;
    gallery.bucketDirectory = galleryFromDb[0].bucketDirectory;
    gallery.dateCreated = galleryFromDb[0].dateCreated;
    gallery.dateUpdated = galleryFromDb[0].dateUpdated;

    for (const row of galleryFromDb) {
        const image = new Image();
        image.uuid = row.uuidOfImage;
        image.title = row.titleOfImage;
        image.description = row.descriptionOfImage;
        image.bucketName = row.bucketNameOfImage;
        image.bucketDirectory = row.bucketDirectoryOfImage;
        image.fileName = row.fileNameOfImage;
        image.url = row.urlImageOfImage;
        // image.dateCreated = row.dateCreatedOfImage;
        // image.dateUpdated = row.dateUpdatedOfImage;
        gallery.listImages.push(image);
    }

    return gallery;
}
