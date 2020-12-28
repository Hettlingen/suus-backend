import {MyFile} from "../model/my-file";
import {FileHelper} from "./utils/fileHelper";

const bucketName = 'myfarmer';

export class FileService {

    public static async saveFile(myFile: MyFile): Promise<boolean> {
        console.log('Mein Dateiname lautet: ' + myFile.fileName);

        const myBucket = FileHelper.getStorage().bucket(bucketName);
        console.log('myBucket lautet: ' + myBucket.name);

        // const file = myBucket.file(myFile.fileName);
        // file.save(myFile.fileContent)
        //     .then(x => console.log('File erfolgreich gespeichert'))
        //     .catch(error => console.log('Fehler beim Speichern des Files: ' + error));

        return true;
    }

    /**
     * URL to read a file: https://storage.googleapis.com/${bucketName}/${fileName}
     * exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;
     */
    public static async getFile(uuidFile: string): Promise<MyFile> {
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
