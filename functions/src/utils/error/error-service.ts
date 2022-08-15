import {ErrorServiceCodeItem} from "./error-service-codes";

export class ErrorService extends Error {

    public errorCode: number;
    public errorCodeDescription: string; // for example: 'Not item found on database'
    public error: any;

    constructor(message: string, errorServiceCodeItem: ErrorServiceCodeItem, error: any) {
        super(message);
        Object.setPrototypeOf(this, ErrorService.prototype);
        Error.captureStackTrace(this);
        this.errorCode = errorServiceCodeItem.errorCode;
        this.errorCodeDescription = errorServiceCodeItem.description;
        this.error = error;
    }
}
