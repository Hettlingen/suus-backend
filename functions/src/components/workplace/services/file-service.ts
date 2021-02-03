import {MyFile} from "../model/my-file";
import {FileHelper} from "./utils/file-helper";

const bucketName = 'myfarmer';

export class FileService {

    public static async saveFile(myFile: MyFile): Promise<MyFile> {
        const myBucket = FileHelper.getStorage().bucket(bucketName);
        const imageBuffer = FileHelper.decodeBase64ToBinaryContent(myFile.fileContent);

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
     * URL to read a file: https://storage.googleapis.com/${bucketName}/${fileName}
     * exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;
     */
    public static async readFile(uuidFile: string): Promise<MyFile> {
        const options = {
            // name of the folder within bucket
            destination: "550e8400-e29b-11d6-a716-446655450001/egg.png",
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        }

        FileHelper.getStorage()
            .bucket(bucketName)
            .file('egg.png')
            .download(options)
            .then(() => {
                console.log("Download Completed");
            })
            .catch((error: any) => {
                throw new Error('[myfarmer] FileService.getFile - Error readgin file: ' + error);
            });

        return new MyFile();
    }

    /**
     * Creates a new bucket in the Asia region with the coldline default storage
     * class. Leave the second argument blank for default settings.
     * For default values see: https://cloud.google.com/storage/docs/locations and
     * https://cloud.google.com/storage/docs/storage-classes
     */
    // private async createBucket() {
    //      const bucket = await storage.createBucket(bucketName, {
    //         location: 'ASIA',
    //         storageClass: 'COLDLINE',
    //     });
    //
    //     console.log('Neuer Bucket lautet: ' + bucket);
    // }
}
