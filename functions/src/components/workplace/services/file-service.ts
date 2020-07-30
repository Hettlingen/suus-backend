import {MyFile} from "../model/my-file";

export class FileService {

    public static async saveFile(file: MyFile): Promise<boolean> {
        console.log('START: FileService.saveFiles');

        // const storage = new Storage({
        //    keyFilename: <server-key-file-path>,
        // });
        //
        // const bucketName = 'my-images';
        //
        // try {
        //     await storage.bucket(bucketName).upload(file.fileName, {
        //         // Support for HTTP requests made with `Accept-Encoding: gzip`
        //         gzip: true,
        //         // By setting the option `destination`, you can change the name of the
        //         // object you are uploading to a bucket.
        //         metadata: {
        //             // Enable long-lived HTTP caching headers
        //             // Use only if the contents of the file will never change
        //             // (If the contents will change, use cacheControl: 'no-cache')
        //             cacheControl: 'public, max-age=31536000',
        //         },
        //     });
        // } catch(error){
        //     console.log(error);
        //     throw new Error('[myfarmer] FileService.saveFiles - Error saving files');
        // }

        return true;
    }

    /**
     * URL to read a file: https://storage.googleapis.com/${bucketName}/${fileName}
     * exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;
     */
    public static async getFile(uuidFile: string): Promise<MyFile> {
        return new MyFile();
    }
}
