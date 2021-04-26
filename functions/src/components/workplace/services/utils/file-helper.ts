import {DownloadResponse, Storage} from "@google-cloud/storage";

const path = require('path');
const serviceKeyFileName = path.join(__dirname, '../config/service-key-google-cloud-storage.json');

export class FileHelper {

    public static getStorage() {
        return new Storage({
            keyFilename: serviceKeyFileName,
            projectId: 'scoop-backend-3000',
        })
    }

    public static encodeBinaryToBase64(contentBinary: DownloadResponse) {
        return contentBinary[0].toString('base64');
    }

    public static decodeBase64ToBinary(contentBase64: string): Buffer {
        return Buffer.from(contentBase64, 'base64');
    }
}
