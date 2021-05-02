import {MyFile} from "../model/my-file";
import {FileHelper} from "./utils/file-helper";
import {RoleType} from "../../identity-access-management/partner/model/roles/role-type";
import {Image} from "../../content-management-system/gallery/model/image";

const bucketName = 'myfarmer';

export class FileService {

    public static async saveImage(myFile: MyFile): Promise<MyFile> {
        const myBucket = FileHelper.getStorage().bucket(bucketName);
        const imageBuffer = FileHelper.decodeBase64ToBinary(myFile.fileContent);

        try {
            await myBucket.file(myFile.fileName).save(imageBuffer, {
                public: true,
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

        // TODO generate uuid and save it in myFile
        // TODO save myFile to database (without the myFile.fileContent
        return myFile;
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
            .bucket(bucketName)
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

    // TODO get this path from config of gcp variables
    // private static evaluateFilePath(roleType: RoleType): string {
    //     switch(roleType) {
    //         case RoleType.ROLE_CUSTOMER: {
    //             return 'administration/consumer/';
    //             break;
    //         }
    //         case RoleType.ROLE_PRODUCER: {
    //             return 'administration/producer/';
    //             break;
    //         }
    //         case RoleType.ROLE_DELIVERER: {
    //             return 'administration/deliverer/';
    //             break;
    //         }
    //         default: {
    //             return 'myfarmer/';
    //             break;
    //         }
    //     }
    // }
}
