import {Storage} from "@google-cloud/storage";

const path = require('path');
const serviceKeyFileName = path.join(__dirname, '../config/service-key-google-cloud-storage.json');

export class FileHelper {

    public static getStorage() {
        return new Storage({
            keyFilename: serviceKeyFileName,
            projectId: 'scoop-backend-3000',
        })
    }

    public static encodeBinaryToBase64Content(contentBinary: Buffer) {
        let contentAsBase64 = contentBinary.toString('base64');
        return contentAsBase64;
    }

    public static decodeBase64ToBinaryContent(contentBase64: string): Buffer {
        return Buffer.from(contentBase64, 'base64');
    }
}
