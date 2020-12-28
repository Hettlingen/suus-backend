import {Storage} from "@google-cloud/storage";

const path = require('path');
const serviceKeyFileName = path.join(__dirname, '../config/service-key-google-cloud-storage.json');

export class FileHelper {

    public static getStorage() {
        console.log('Service Key: ' + serviceKeyFileName);
        return new Storage({
            keyFilename: serviceKeyFileName,
            projectId: 'scoop-backend-3000',
        })
    }

    /**
     * Access public files on google cloud storage:
     * https://storage.googleapis.com/${bucketName}/${fileName}
     */
    public static getPublicUrl(bucketName: string, fileName: string): string {
        return `https://storage.googleapis.com/${bucketName}/${fileName}`;
    }
}
