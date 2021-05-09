import {MyFile} from "../model/my-file";
import {FileHelper} from "./utils/file-helper";
import {RoleType} from "../../identity-access-management/partner/model/roles/role-type";
import {Image} from "../../content-management-system/gallery/model/image";

export class FileService {

    public static async saveFile(myFile: MyFile): Promise<boolean> {
        const myBucket = FileHelper.getStorage().bucket(myFile.bucketName);
        const imageBuffer = FileHelper.decodeBase64ToBinary(myFile.fileContentAsBase64);

        try {
            await myBucket.file(myFile.bucketDirectory + myFile.fileName).save(imageBuffer, {
                public: false,
                gzip: false,
                resumable: false,
                metadata: {
                    contentType: myFile.mimeType,
                    cacheControl: 'public, max-age=31536000',
                }
            });
        } catch(error) {
            throw error;
        }

        return true;
    }

    public static async saveImage(image: Image): Promise<boolean> {
        const myBucket = FileHelper.getStorage().bucket(image.bucketName);
        const imageBuffer = FileHelper.decodeBase64ToBinary(image.fileContentAsBase64);

        try {
            await myBucket.file(image.bucketDirectory + image.fileName).save(imageBuffer, {
                public: false,
                gzip: false,
                resumable: false,
                metadata: {
                    contentType: image.mimeType,
                    cacheControl: 'public, max-age=31536000',
                }
            });
        } catch(error) {
            throw error;
        }

        return true;
    }

    public static async deleteImage(image: Image): Promise<boolean> {
        const myBucket = FileHelper.getStorage().bucket(image.bucketName);

        try {
            await myBucket.file(image.bucketDirectory + image.fileName).delete();
        } catch(error) {
            throw error;
        }

        return true;
    }

    /**
     * Public URL on GCP: https://storage.googleapis.com/${bucketName}/${fileName}
     * URL of Bucket on GCP: z.B. gs://myfarmer/administration/producer/1000.png
     */
    public static async readImageAsBase64(image: Image): Promise<string> {
        const fileByteArray = await FileHelper.getStorage()
            .bucket(image.bucketName)
            .file(image.bucketDirectory + image.fileName)
            .download();

        return FileHelper.encodeBinaryToBase64(fileByteArray);
    }

    /**
     * URL to read a file: https://storage.googleapis.com/${bucketName}/${fileName}
     * exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;
     */
    public static async readImageOfRole(uuidFile: string, roleType: RoleType): Promise<MyFile> {
        const fileName = uuidFile + '.png';

        FileHelper.getStorage()
            .bucket('myfarmer')
            .file(fileName)
            .download()
            .then((file) => {
                console.log('Download Completed: ' + file);
                const myFile = new MyFile();
                myFile.fileName = 'teeeeeessssst';
                return myFile;
            })
            .catch((error: any) => {
                throw new Error('[myfarmer] FileService.getFile - Error reading file: ' + error);
            });

        throw new Error('[myfarmer] FileService.getFile - Error reading file');
    }
}
