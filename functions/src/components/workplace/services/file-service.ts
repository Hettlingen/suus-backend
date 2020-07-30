import {MyFile} from "../model/my-file";

// const util = require('util')
// const gc = require('./config/');
// const bucket = gc.bucket('all-mighti') // should be your bucket name

const path = require('path');
const serviceKey = path.join(__dirname, './google-storage-keys.json');


export class FileService {

    public static async saveFile(file: MyFile): Promise<boolean> {
        console.log('START: FileService.saveFiles');

        // only for testing with local files
        const fileName = './assets/carrots.png';

        const storage = new Storage();
        storage.keyFilename = serviceKey;
        storage.projectId = 'scoop-backend-3000';

        const bucketName = 'images-products';

        try {
            await storage.bucket(bucketName).upload(fileName, {
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
            });
        } catch(error){
            console.log(error);
            throw new Error('[myfarmer] FileService.saveFiles - Error saving files');
        }

        console.log(`${file.fileName} uploaded to ${bucketName}.`);

        return true;
    }

    /**
     * URL to read a file: https://storage.googleapis.com/${bucketName}/${fileName}
     * exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;
     */
    public static async getFile(uuidFile: string): Promise<MyFile> {
        return new MyFile();
    }

    /**
     *
     * @param { File } object file object that will be uploaded
     * @description - This function does the following
     * - It uploads a file to the image bucket on Google Cloud
     * - It accepts an object as an argument with the
     *   "originalname" and "buffer" as keys
     */
    // private uploadFile(file: any): string {
    //     const { originalname, buffer } = file
    //     const blob = bucket.file(originalname.replace(/ /g, "_"))
    //     const blobStream = blob.createWriteStream({
    //         resumable: false
    //     })
    //     blobStream.on('finish', () => {
    //         const publicUrl = util.format(
    //             `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    //         )
    //         return publicUrl;
    //     }).on('error', () => {
    //             return 'Unable to upload image, something went wrong';
    //         })
    //         .end(buffer)
    // }
}
