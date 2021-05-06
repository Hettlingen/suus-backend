import {DownloadResponse, Storage} from "@google-cloud/storage";
import {MyFile} from "../../model/my-file";
import {MimeType} from "./mime-type";
import {FileExtension} from "./file-extension";

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

    public static createFileName(myFile: MyFile): string {
        const fileName = myFile.uuid;
        const fileExtension = this.getFileExtension(myFile);
        return fileName + '.' + fileExtension;
    }

    private static getFileExtension(myFile: MyFile): string {
        if (myFile.mimeType === MimeType.IMAGE_JPEG) {
            return FileExtension.JPEG;
        } else if (myFile.mimeType === MimeType.IMAGE_PNG) {
            return FileExtension.PNG;
        }
        return 'txt';
    }
}
