import {DownloadResponse, Storage} from "@google-cloud/storage";
import {MyFile} from "../../model/my-file";
import {MimeType} from "./mime-type";
import {FileExtension} from "./file-extension";

const path = require('path');
// --dirname delivers the absolute path of the actual file location. Here of the file 'file-helper.ts'
const serviceKeyFileName = path.join(__dirname, '../configuration/firebase-private-key-for-storage.json');
// cwd is a method of global object process, returns a string value which is the current working directory of the Node.js process.
// const rootProjectDirectory = process.cwd();

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
        const lastIndexOfHeader = contentBase64.lastIndexOf(",");
        const contentBase64WithoutHeaderInfo = contentBase64.slice(lastIndexOfHeader + 1);
        return Buffer.from(contentBase64WithoutHeaderInfo, 'base64');
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
