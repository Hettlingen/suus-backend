export class ErrorHttp extends Error {

    public statusCode: string; // HttpErrorCode.NOT_FOUND
    public statusCodeDescription: string; // for example: 'Not found'

    constructor(message: string, errorCode: string, statusCodeDescription: string) {
        super(message);
        Object.setPrototypeOf(this, ErrorHttp.prototype);
        Error.captureStackTrace(this);
        this.statusCode = errorCode;
        this.statusCodeDescription = statusCodeDescription;
    }
}
